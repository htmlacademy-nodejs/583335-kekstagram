'use strict';

const packageAuthorInfo = require(`../package.json`).author;

module.exports = {
  name: `author`,
  description: `Shows author`,
  execute() {
    console.log(`Author: ${packageAuthorInfo}`);
  }
};
