'use strict';

const express = require(`express`);
// eslint-disable-next-line new-cap
const postsRouter = express.Router();
const generateData = require(`../../generator/generateEntity.js`).execute();
const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const multer = require(`multer`);
const {TEST_DATE} = require(`../../util/const.js`);
const validate = require(`./validate`);

const upload = multer({storage: multer.memoryStorage()});

const NUMBER_POST = 17;
const SKIP_DEFAULT = 0;
const LIMIT_DEFAULT = 50;

const jsonParser = express.json();
const posts = [];

postsRouter.get(`/`, (req, res) => {
  const skip = parseInt(req.query.skip, 10) || SKIP_DEFAULT;
  const limit = parseInt(req.query.limit, 10) || LIMIT_DEFAULT;
  const postTotal = posts.slice(skip, limit + skip);

  const data = {
    data: postTotal,
    skip,
    limit,
    total: postTotal.length,
  };

  res.send(data);
});

postsRouter.get(`/:date`, (req, res) => {
  const date = parseInt(req.params.date, 10);
  if (!date) {
    throw new IllegalArgumentError(`В запросе не указана дата`);
  }

  const post = posts.find((item) => {
    if (item.date === date) {
      return item;
    }

    return false;
  });

  if (!post) {
    throw new NotFoundError(`не найден пост с датой ${date}`);
  }

  res.send(post);
});

postsRouter.post(``, jsonParser, upload.single(`image`), (req, res) => {

  const image = req.file;
  const body = req.body;

  if (image) {
    body.image = {title: image.originalname};
  }

  res.send(validate(body));
});


for (let i = 0; i < NUMBER_POST; i++) {
  posts[i] = generateData();
}

posts[0].date = TEST_DATE; // для теста api/posts/:date === TEST_DATE

module.exports = postsRouter;
