'use strict';

const Cursor = require(`./cursor-mock`);
// const generateData = require(`../generator/createFileEntity`);
const {generateEntity} = require(`../generator/generateEntity.js`);
const {
  NUMBER_ENTITY_IN_STORE,
  POST_IN_STORE,
} = require(`../../src/util/const.js`);

class PostsStoreMock {
  constructor(data) {
    this.data = data;
  }

  async getPost(date) {
    return this.data.find((it) => it.date === date);
  }

  get allPosts() {
    return (async () => new Cursor(this.data))();
  }

  async save() {
    return {
      insertedId: 42
    };
  }
}

// module.exports = new PostsStoreMock(generateData.execute([NUMBER_ENTITY_IN_STORE]));

module.exports = new PostsStoreMock(
    (() => {
      const posts = [];

      for (let i = 0; i < NUMBER_ENTITY_IN_STORE - 1; i++) {
        posts.push(generateEntity());
      }
      posts.push(POST_IN_STORE);

      console.log(`posts`);
      console.log(posts);

      return posts;
    })()
);
