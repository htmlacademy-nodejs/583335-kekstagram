'use strict';

const supertest = require(`supertest`);
const express = require(`express`);
const app = express();

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};

const ERROR_HANDLER = (err, req, res, _next) => {
  if (err) {
    res.status(err.code || 500).send(err.message);
  }
};

app.use(express.static(`static`));
app.use(NOT_FOUND_HANDLER);
app.use(ERROR_HANDLER);


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
    const a = await supertest(app)
      .get(`/badway`)
      .expect(404)
      .expect(`Page was not found`)
      .expect(`Content-Type`, /html/);
  });
});
