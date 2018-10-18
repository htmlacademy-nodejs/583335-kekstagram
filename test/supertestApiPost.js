'use strict';
const supertest = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../src/server`);

const IMG_URL = `test/img/26.jpg`;

describe(`POST`, () => {
  describe(`POST /api/posts/`, () => {
    it(`send post as json`, async () => {
      const sent = {
        date: Date.now()
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
    it(`send post as multipart/form-data`, async () => {
      const date = Date.now();

      const response = await supertest(app)
        .post(`/api/posts`)
        .field(`date`, date)
        .set(`Accept`, `application/json`)
        .set(`Content-Type`, `multipart/form-data`)
        .expect(200)
        .expect(`Content-Type`, /json/);


      const post = response.body;
      assert.deepEqual(post, {date});
    });
    it(`send post with pick as multipart/form-data`, async () => {
      const date = Date.now();

      const response = await supertest(app)
        .post(`/api/posts`)
        .field(`date`, date)
        .attach(`url`, IMG_URL)
        .set(`Accept`, `application/json`)
        .set(`Content-Type`, `multipart/form-data`)
        .expect(200)
        .expect(`Content-Type`, /json/);


      const post = response.body;
      assert.deepEqual(post, {
        date,
        url: `26.jpg`
      });
    });
  });
});
