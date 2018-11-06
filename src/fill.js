'use strict';

const {generateEntity} = require(`./generator/generateEntity`);
const store = require(`./posts/store`);


const POSTS_NUMBER = 10;

module.exports = {
  name: `fill`,
  description: `заполняет базу данных тестовыми данными`,
  async execute() {
    await store.drop();

    for (let i = 0; i < POSTS_NUMBER; i++) {
      await store.save(generateEntity());
    }

    console.log(`заполняет базу данных тестовыми данными`);
    process.exit(0);
  }
};
