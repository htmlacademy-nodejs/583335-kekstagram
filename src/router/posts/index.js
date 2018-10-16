'use strict';

const express = require(`express`);
// eslint-disable-next-line new-cap
const postsRouter = express.Router();
const generateData = require(`../../generator/generateEntity.js`).execute();

const posts = [];

const NUMBER_POST = 17;

const SKIP_DEFAULT = 0;
const LIMIT_DEFAULT = 50;

postsRouter.get(`/`, (req, res) => {
  const skip = parseInt(req.query.skip, 10) || SKIP_DEFAULT;
  const limit = parseInt(req.query.limit, 10) || LIMIT_DEFAULT;
  const data = posts.slice(skip, limit + skip);

  res.send(data);
});

postsRouter.get(`/:date`, (req, res) => {
  const date = parseInt(req.params.date, 10);
  const post = posts.find((item) => {
    if (item.date === date) {
      return item;
    }

    return false;
  });
  res.send(post);
});

for (let i = 0; i < NUMBER_POST; i++) {
  posts[i] = generateData();
}

module.exports = postsRouter;
