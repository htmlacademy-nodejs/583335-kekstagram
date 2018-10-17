'use strict';

const supertest = require(`supertest`);
const {app} = require(`../src/server`);


describe(`static`, () => {

  it(`checked index`, async () => {
    await supertest(app)
      .get(`/`)
      .expect(200)
      .expect(`Content-Type`, /html/);
  });

  it(`checked css`, async () => {
    await supertest(app)
      .get(`/css/style.css`)
      .expect(200)
      .expect(`Content-Type`, /css/);
  });

  it(`checked favicon`, async () => {
    await supertest(app)
      .get(`/favicon.ico`)
      .expect(200)
      .expect(`Content-Type`, /x-icon/);
  });

  it(`get data from unknown resource`, async () => {
    return await supertest(app)
      .get(`/badway`)
      .expect(404)
      .expect(`Page was not found`)
      .expect(`Content-Type`, /html/);
  });
});
