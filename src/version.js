'use strict';

const packageVersionInfo = require(`../package.json`).version;

module.exports = {
  name: `version`,
  description: `Shows program version`,
  execute() {
    console.log(`v${packageVersionInfo}`);
  }
};
