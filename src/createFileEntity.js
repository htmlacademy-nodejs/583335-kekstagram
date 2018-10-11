'use strict';

const fs = require(`fs`);
const generateEntity = require(`./generator/generateEntity.js`).execute();

const DEFAULT_PATH = `${process.cwd()}`;
const DEFAULT_FILE_NAME = `entity.json`;

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

module.exports = {
  name: `createFileEntity`,
  description: `createFileEntity`,
  execute([quantity = 1, filePath = DEFAULT_PATH, fileName = DEFAULT_FILE_NAME]) {

    const data = [];

    for (let i = 0; i < quantity; i++) {
      data.push(generateEntity(quantity));
    }

    console.log([quantity, filePath, fileName]);
    const path = `${filePath}/${fileName}`;
    return new Promise((success, fail) => {
      fs.writeFile(path, JSON.stringify(data), fileWriteOptions, (err) => {
        if (err) {
          return fail(err);
        }

        return success();
      });
    });
  }
};
