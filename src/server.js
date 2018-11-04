'use strict';

const express = require(`express`);

const postsStore = require(`./posts/store`);
const imageStore = require(`./image/store`);
const postRouter = require(`./posts/router.js`)(postsStore, imageStore);
const logger = require(`./logger`);


const app = express();

const DEFAULT_PORT = 3000;

const {SERVER_PORT = 3000, SERVER_HOST = `localhost`} = process.env;

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};

const ERROR_HANDLER = (err, req, res, _next) => {
  if (err) {
    res.status(err.code || 500).send(err.message);
  }
};

const CORS_HANDLER = (req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': `*`,
    'Access-Control-Allow-Headers': `Origin, X-Requested-With, Content-Type, Accept`
  });
  next();
};

app.use(express.static(`static`));
app.use(`/api/posts`, postRouter);
app.use(NOT_FOUND_HANDLER);
app.use(ERROR_HANDLER);
app.use(CORS_HANDLER);

const runServer = (port = SERVER_PORT) => {
  app.listen(port, SERVER_HOST, () => logger.info(`Сервер запущен: http://${SERVER_HOST}:${port}`));
};

module.exports = {
  name: `server`,
  description: `server`,
  execute(port = DEFAULT_PORT) {
    runServer(port);
  },
  app: runServer,
};


if (require.main === module) {
  runServer();
}
