'use strict';
const supertest = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../src/server`);

const IMG_URL = `test/img/26.jpg`;
const IMG_NAME = `26.jpg`;
const POST_DESCRIPTION = `Самая красивая тачка на этой планете`;
const POST_EFFECT = `chrome`;
const POST_HASHTAGS = `#тачка #огонь #car #bmwX5`;
const POST_SCALE = `100`;

describe(`POST /api/posts`, () => {
  it(`send post as json`, async () => {
    const sent = {
      "filename": IMG_URL,
      "description": POST_DESCRIPTION,
      "effect": POST_EFFECT,
      "hashtags": POST_HASHTAGS,
      "scale": POST_SCALE,
    };

    const response = await supertest(app)
      .post(`/api/posts`)
      .send(sent)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const post = response.body;
    assert.deepEqual(post, sent);
  });

  it(`send post as json with no url and get error`, async () => {
    const sent = {
      "filename": ``,
      "description": POST_DESCRIPTION,
      "effect": POST_EFFECT,
      "hashtags": POST_HASHTAGS,
      "scale": POST_SCALE,
    };

    await supertest(app)
      .post(`/api/posts`)
      .send(sent)
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
    assert.deepEqual(newPost,
        {
          filename: IMG_URL,
          description: POST_DESCRIPTION,
          effect: POST_EFFECT,
          hashtags: POST_HASHTAGS,
          scale: POST_SCALE,
        }
    );
  });

  it(`send post with image as multipart/form-data`, async () => {
    const response = await supertest(app)
      .post(`/api/posts`)
      .field(`filename`, IMG_URL)
      .field(`description`, POST_DESCRIPTION)
      .field(`effect`, POST_EFFECT)
      .field(`hashtags`, POST_HASHTAGS)
      .field(`scale`, POST_SCALE)
      .attach(`image`, IMG_URL)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `multipart/form-data`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const post = response.body;
    assert.deepEqual(post,
        {
          filename: IMG_URL,
          description: POST_DESCRIPTION,
          effect: POST_EFFECT,
          hashtags: POST_HASHTAGS,
          scale: POST_SCALE,
          image: {
            title: IMG_NAME
          }
        }
    );
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
