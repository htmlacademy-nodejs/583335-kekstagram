'use strict';

const express = require(`express`);

const postsStore = require(`./router/posts/store`);
const imageStore = require(`./image/store`);
const postRouter = require(`./router/posts/router.js`)(postsStore, imageStore);


const app = express();

const DEFAULT_PORT = 3000;

const NOT_FOUND_HANDLER = (req, res) => {

  res.status(404).send(`Page was not found`);
};

const ERROR_HANDLER = (err, req, res, _next) => {
  if (err) {
    res.status(err.code || 500).send(err.message);
  }
};

app.use(express.static(`static`));
app.use(`/api/posts`, postRouter);

app.use(NOT_FOUND_HANDLER);
app.use(ERROR_HANDLER);

const runServer = (port = DEFAULT_PORT) => {
  app.listen(port, () => console.log(`Сервер запущен: http://localhost:${port}`));
};

module.exports = {
  name: `server`,
  description: `server`,
  execute(port = DEFAULT_PORT) {
    runServer(port);
  },
  app
};


if (require.main === module) {
  runServer();
}
