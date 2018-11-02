'use strict';

const {MongoClient} = require(`mongodb`);

const {
  DB_HOST = `127.0.0.1:27017`,
  DB_PATH = `583335-kekstagram-1`
} = process.env;

const url = `mongodb://${DB_HOST}`;

module.exports = MongoClient.connect(url, {useNewUrlParser: true})
    .then((client) => client.db(DB_PATH))
    .catch((e) => {
      console.log(`Failed to connect to MongoDB`, e);
      process.exit(1);
    });
