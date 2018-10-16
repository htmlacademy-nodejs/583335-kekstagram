'use strict';

const supertest = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../src/server`);

describe(`GET /api/posts`, () => {

  it(`get all posts`, async () => {
    const response = await supertest(app)
      .get(`/api/posts`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const posts = response.body;
    assert.equal(posts.length, 17);
  });
});
