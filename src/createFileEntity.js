'use strict';

const fs = require(`fs`);
const generateEntity = require(`./generator/generateEntity.js`).execute();

const DEFAULT_PATH = `${process.cwd()}`;
const DEFAULT_FILE_NAME = `entity.json`;

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

module.exports = {
  name: `createFileEntity`,
  description: `createFileEntity`,
  execute([quantity = 1, filePath, fileName]) {

    filePath = filePath === `` ? DEFAULT_PATH : filePath;
    fileName = fileName === `` ? DEFAULT_FILE_NAME : fileName;

    const data = [];

    for (let i = 0; i < quantity; i++) {
      data.push(generateEntity(quantity));
    }

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
