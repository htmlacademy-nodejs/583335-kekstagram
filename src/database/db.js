'use strict';

const {MongoClient} = require(`mongodb`);
const logger = require(`../logger`);

const {
  DB_HOST = `127.0.0.1:27017`,
  DB_PATH = `kekstagram`
} = process.env;

const url = `mongodb://${DB_HOST}`;

module.exports = MongoClient.connect(url, {useNewUrlParser: true})
    .then((client) => client.db(DB_PATH))
    .catch((err) => {
      logger.error(`Failed to connect to MongoDB ${err}`, err);
      process.exit(1);
    });
