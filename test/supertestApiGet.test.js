'use strict';

const supertest = require(`supertest`);
const assert = require(`assert`);
const express = require(`express`);
// const {app} = require(`../src/server`);

const postsStoreMock = require(`./mock/posts-store-mock`);
const imageStoreMock = require(`./mock/image-store-mock`);
const postsRouter = require(`../src/router/posts/router`)(postsStoreMock, imageStoreMock);

const {TEST_DATE} = require(`../src/util/const.js`);

const BAD_TEST_DATE = 7776000; // 1 апреля 1970г
const LENGTH_POSTS = 17;
const SKIP_POST = 2;
const LENGTH_POSTS_WITH_SKIP = LENGTH_POSTS - SKIP_POST;

const app = express();
app.use(`/api/posts`, postsRouter);

describe(`GET /api/posts`, () => {

  it(`get all posts`, async () => {
    const response = await supertest(app)
      .get(`/api/posts`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const posts = response.body;
    console.log(`>>> posts`);
    console.log(posts);
    console.log(posts.data.length);
    console.log(LENGTH_POSTS);
    assert.equal(posts.data.length, LENGTH_POSTS);
  });

  it(`get all posts with / at the end`, async () => {
    const response = await supertest(app)
      .get(`/api/posts/`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const posts = response.body;
    assert.equal(posts.data.length, LENGTH_POSTS);
  });

  it(`get all posts?skip=${SKIP_POST}&limit=20`, async () => {
    const response = await supertest(app)
      .get(`/api/posts?skip=2&limit=20`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const posts = response.body;
    assert.equal(posts.total, LENGTH_POSTS_WITH_SKIP);
    assert.equal(posts.data.length, LENGTH_POSTS_WITH_SKIP);
  });

  it(`get data from unknown resource`, async () => {
    return await supertest(app)
      .get(`/api/badway`)
      .set(`Accept`, `application/json`)
      .expect(404)
      .expect(`Page was not found`)
      .expect(`Content-Type`, /html/);
  });
});

describe(`GET /api/posts/:date`, () => {
  it(`get post with date ${TEST_DATE}`, async () => {
    const response = await supertest(app)
      .get(`/api/posts/${TEST_DATE}`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const post = response.body;
    assert.strictEqual(post.date, TEST_DATE);
  });

  it(`get unknown post with date ${BAD_TEST_DATE}`, async () => {
    return supertest(app)
      .get(`/api/posts/${BAD_TEST_DATE}`)
      .set(`Accept`, `application/json`)
      .expect(404)
      .expect(`не найден пост с датой ${BAD_TEST_DATE}`)
      .expect(`Content-Type`, /html/);
  });
});
