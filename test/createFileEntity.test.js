'use strict';

const NUMBER_TEST = 10; // кол-во тестов
const MAX_NUMBER_ENTITY = 20;

const assert = require(`assert`); // core module
const fs = require(`fs`);
const {promisify} = require(`util`);
const createFileEntity = require(`../src/generator/createFileEntity.js`);
const getRandomInteger = require(`../src/util/func.js`).getRandomInteger;

const access = promisify(fs.access);
const unlink = promisify(fs.unlink);

describe(`Generate file entity`, () => {
  for (let i = 0; i < NUMBER_TEST; i++) {
    it(`должен произойти сбой в не существующей папке`, () => {
      const quantity = getRandomInteger(MAX_NUMBER_ENTITY);
      const tempFilePath = `${__dirname}/folder666`;
      const tempFileName = `testFile.json`;

      return createFileEntity.execute([quantity, tempFilePath, tempFileName])
              .then(() => assert.fail(`путь ${tempFilePath}/${tempFileName} не должен быть доступен`))
              .catch((e) => assert.ok(e));
    });

    it(`должен создать новый файл`, () => {
      const quantity = getRandomInteger(MAX_NUMBER_ENTITY);
      const tempFilePath = `${__dirname}`;
      const tempFileName = `testFile.json`;

      return createFileEntity.execute([quantity, tempFilePath, tempFileName])
              .then(access(`${tempFilePath}\\${tempFileName}`))
              .catch(unlink(`${tempFilePath}\\${tempFileName}`));
    });
  }
});
