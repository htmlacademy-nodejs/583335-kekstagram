'use strict';

const packageDescriptionInfo = require(`../package.json`).description;

module.exports = {
  name: `description`,
  description: `Shows description`,
  execute() {
    console.log(`Description: ${packageDescriptionInfo}`);
  }
};
