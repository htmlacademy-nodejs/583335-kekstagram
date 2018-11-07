'use strict';

const express = require(`express`);

const postsStore = require(`./posts/store`);
const imageStore = require(`./image/store`);
const postRouter = require(`./posts/router.js`)(postsStore, imageStore);
const logger = require(`./logger`);

const app = express();

const {SERVER_PORT, SERVER_HOST} = process.env;
const DEFAULT_PORT = SERVER_PORT;
const MIM_NUMBER_PORT = 2000;

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
app.use(CORS_HANDLER);

app.use(express.static(`static`));
app.use(`/api/posts`, postRouter);
app.use(NOT_FOUND_HANDLER);
app.use(ERROR_HANDLER);

const runServer = (port = SERVER_PORT) => {
  app.listen(port, SERVER_HOST, () => logger.info(`Сервер запущен: http://${SERVER_HOST}:${port}`));
};

module.exports = {
  name: `server`,
  description: `server`,
  execute(port = DEFAULT_PORT) {
    const portArgv = (process.argv[3] > MIM_NUMBER_PORT) ? process.argv[3] : port;

    runServer(portArgv);
  },
  app: runServer,
};


if (require.main === module) {
  runServer();
}
