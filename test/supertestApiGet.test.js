'use strict';

const supertest = require(`supertest`);
const assert = require(`assert`);
const express = require(`express`);

const postsStoreMock = require(`./mock/posts-store-mock`);
const imageStoreMock = require(`./mock/image-store-mock`);
const postsRouter = require(`../src/posts/router`)(postsStoreMock, imageStoreMock);

const app = express();

const {
  NUMBER_ENTITY_IN_STORE,
  POST_IN_STORE,
} = require(`../src/util/const.js`);

const BAD_TEST_DATE = 7776000; // 1 апреля 1970г
const SKIP_POST = 2;
const LENGTH_POSTS_WITH_SKIP = NUMBER_ENTITY_IN_STORE - SKIP_POST;

app.use(`/api/posts`, postsRouter);

describe(`GET /api/posts`, () => {

  it(`get all posts`, async () => {
    const response = await supertest(app)
      .get(`/api/posts`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const postsNumber = response.body.total;
    assert.equal(postsNumber, 5);
  });

  it(`get all posts`, async () => {
    const response = await supertest(app)
      .get(`/api/posts`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const posts = response.body;
    assert.equal(posts.data.length, NUMBER_ENTITY_IN_STORE);
  });

  it(`get all posts with / at the end`, async () => {
    const response = await supertest(app)
      .get(`/api/posts/`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const posts = response.body;
    assert.equal(posts.data.length, NUMBER_ENTITY_IN_STORE);
  });

  it(`get all posts?skip=${SKIP_POST}&limit=20`, async () => {
    const response = await supertest(app)
      .get(`/api/posts?skip=${SKIP_POST}&limit=20`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const posts = response.body;
    assert.equal(posts.data.length, LENGTH_POSTS_WITH_SKIP);
  });

  describe(`GET /api/posts/:date`, () => {
    it(`get post with date ${POST_IN_STORE.date}, chacked all fields`, async () => {
      const response = await supertest(app)
        .get(`/api/posts/${POST_IN_STORE.date}`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/);

      const post = response.body;
      assert.strictEqual(post.url, POST_IN_STORE.url);
      assert.strictEqual(post.description, POST_IN_STORE.description);
      assert.strictEqual(post.effect, POST_IN_STORE.effect);
      assert.strictEqual(post.hashtags, POST_IN_STORE.hashtags);
      assert.strictEqual(post.comments, POST_IN_STORE.comments);
      assert.strictEqual(post.likes, POST_IN_STORE.likes);
      assert.strictEqual(post.date, POST_IN_STORE.date);
    });

    it(`get unknown post with date ${BAD_TEST_DATE}`, async () => {
      return supertest(app)
        .get(`/api/posts/${BAD_TEST_DATE}`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Пост с датой ${BAD_TEST_DATE} не найден!`)
        .expect(`Content-Type`, /html/);
    });
  });
});


