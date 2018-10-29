'use strict';

const Cursor = require(`./cursor-mock`);
const generateData = require(`../generator/createFileEntity`);

const LENGTH_POSTS = 17;

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

module.exports = new PostsStoreMock(generateData.execute([LENGTH_POSTS]));
