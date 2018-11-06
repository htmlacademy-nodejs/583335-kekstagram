'use strict';

const packageVersionInfo = require(`../package.json`).version;

module.exports = {
  name: `version`,
  description: `Shows program version`,
  execute() {
    const version = packageVersionInfo.split(`.`);
    console.log(`v${version[0].red}.${version[1].green}.${version[2].blue}`);
    process.exit(0);
  }
};
