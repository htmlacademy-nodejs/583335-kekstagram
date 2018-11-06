'use strict';

const express = require(`express`);
const logger = require(`../logger`);

// eslint-disable-next-line new-cap
const postsRouter = express.Router();
const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const InvalidMethod = require(`../error/invalid-method`);
const multer = require(`multer`);
const MongoError = require(`mongodb`).MongoError;
const {Duplex} = require(`stream`);

const ValidationError = require(`../error/validation-error`);
const validate = require(`./validate`);

const upload = multer({storage: multer.memoryStorage()});
const jsonParser = express.json();

const SKIP_DEFAULT = 0;
const LIMIT_DEFAULT = 50;
const VALID_METHODS = [`GET`, `POST`];

const asyncMiddleware = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const toStream = (buffer) => {
  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

const toPage = async (cursor, skip = SKIP_DEFAULT, limit = LIMIT_DEFAULT) => {
  const packet = await cursor.skip(skip).limit(limit).toArray();
  return {
    data: packet,
    skip,
    limit,
    total: await cursor.count()
  };
};

postsRouter.get(``, asyncMiddleware(async (req, res) => {
  const skip = parseInt(req.query.skip || SKIP_DEFAULT, 10);
  const limit = parseInt(req.query.limit || LIMIT_DEFAULT, 10);
  if (isNaN(skip) || isNaN(limit)) {
    throw new IllegalArgumentError(`Неверное значение параметра "skip" или "limit"`);
  }

  const data = await postsRouter.postsStore.allPosts;

  res.send(await toPage(data, skip, limit));
}));

postsRouter.get(`/:date`, asyncMiddleware(async (req, res) => {
  const date = parseInt(req.params.date, 10);
  const post = await postsRouter.postsStore.getPost(date);
  if (!post) {
    throw new NotFoundError(`Пост с датой ${date} не найден!`);
  }

  res.send(post);
}));

postsRouter.get(`/:date/image`, asyncMiddleware(async (req, res) => {
  const date = parseInt(req.params.date, 10);
  const post = await postsRouter.postsStore.getPost(date);
  if (!post) {
    throw new NotFoundError(`Пост с датой ${date} не найден!`);
  }

  const {stream, info} = await postsRouter.imageStore.get(post._id);
  if (!stream) {
    throw new NotFoundError(`Фотография не найдена!`);
  }

  res.set({
    'Content-Type': post.filename.mimetype,
    'Content-Length': info.length
  });

  res.on(`error`, (err) => logger.error(`Error with GET /:date/image response    ${err}`, err));
  res.on(`end`, res.end);

  stream.on(`error`, (err) => logger.error(`Error with /:date/image stream    ${err}`, err));
  stream.on(`end`, res.end);

  stream.pipe(res);
}));

postsRouter.post(``, jsonParser, upload.single(`filename`), asyncMiddleware(async (req, res, _next) => {
  const image = req.file;
  const body = req.body;

  if (image) {
    const {mimetype, originalname} = image;
    body.filename = {
      mimetype,
      name: originalname
    };
  }

  if (!body.date) {
    body.date = Math.floor(Date.now());
  }
  body.url = `/api/posts/${parseInt(body.date, 10)}/image`;

  const result = await postsRouter.postsStore.save(validate(body));
  const insertedId = result.insertedId;

  if (image) {
    await postsRouter.imageStore.save(insertedId, toStream(image.buffer));
    res.type(image.mimetype);
    res.send(image.buffer);
    return;
  }

  res.send(validate(body));
}));

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};

const ERROR_HANDLER = (err, req, res, _next) => {
  logger.error(`ERROR_HANDLER ${err}`, err);
  if (err instanceof ValidationError) {
    res.status(err.code).json(err.errors);
    return;
  } else if (err instanceof MongoError) {
    res.status(400).json(err.message);
    return;
  }
  res.status(err.code || 500).send(err.message);
};

const INVALID_METHODS = (req, res, next) => {
  if (!VALID_METHODS.includes(req.method)) {
    res.status(501);
    throw new InvalidMethod(`${req.method}`);
  } else {
    next();
  }
};

postsRouter.use(INVALID_METHODS);
postsRouter.use(ERROR_HANDLER);
postsRouter.use(NOT_FOUND_HANDLER);


module.exports = (postsStore, imageStore) => {
  postsRouter.postsStore = postsStore;
  postsRouter.imageStore = imageStore;
  return postsRouter;
};
