'use strict';

const supertest = require(`supertest`);
const assert = require(`assert`);
const express = require(`express`);

const postsStoreMock = require(`./mock/posts-store-mock`);
const imageStoreMock = require(`./mock/image-store-mock`);
const postsRouter = require(`../src/posts/router`)(postsStoreMock, imageStoreMock);

const app = express();

const IMG_URL = `test/img/26.jpg`;
const POST_DESCRIPTION = `Самая красивая тачка на этой планете`;
const POST_EFFECT = `chrome`;
const POST_HASHTAGS = [`#тачка`, `#огонь`, `#car`, `#bmwX5`];
const POST_SCALE = `100`;

app.use(`/api/posts`, postsRouter);

describe(`POST /api/posts`, () => {
  it(`send post as json`, async () => {
    const SENT = {
      "filename": IMG_URL,
      "description": POST_DESCRIPTION,
      "effect": POST_EFFECT,
      "hashtags": POST_HASHTAGS,
      "scale": POST_SCALE,
    };

    const response = await supertest(app)
      .post(`/api/posts`)
      .send(SENT)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const post = response.body;
    assert.strictEqual(post.description, SENT.description);
    assert.strictEqual(post.effect, SENT.effect);
    assert.deepStrictEqual(post.hashtags, SENT.hashtags);
  });

  it(`send post as json with no url and get error`, async () => {
    const SENT = {
      "filename": ``,
      "description": POST_DESCRIPTION,
      "effect": POST_EFFECT,
      "hashtags": POST_HASHTAGS,
      "scale": POST_SCALE,
    };

    await supertest(app)
      .post(`/api/posts`)
      .send(SENT)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `application/json`)
      .expect(400);
  });

  it(`send post as multipart/form-data`, async () => {
    const response = await supertest(app)
      .post(`/api/posts`)
      .field(`filename`, IMG_URL)
      .field(`description`, POST_DESCRIPTION)
      .field(`effect`, POST_EFFECT)
      .field(`hashtags`, POST_HASHTAGS)
      .field(`scale`, POST_SCALE)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `multipart/form-data`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const newPost = response.body;

    assert.strictEqual(newPost.filename, IMG_URL);
    assert.strictEqual(newPost.description, POST_DESCRIPTION);
    assert.strictEqual(newPost.effect, POST_EFFECT);
    assert.deepStrictEqual(newPost.hashtags, POST_HASHTAGS);
    assert.strictEqual(newPost.scale, POST_SCALE);
  });

  it(`send post as multipart/form-data with no date and get error`, async () => {
    await supertest(app)
      .post(`/api/posts`)
      .field(`filename`, IMG_URL)
      .field(`description`, POST_DESCRIPTION)
      .field(`effects`, POST_EFFECT)
      .field(`hashtags`, POST_HASHTAGS)
      .field(`scale`, POST_SCALE)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `multipart/form-data`)
      .expect(400);
  });
});
