'use strict';

const packageLicenseInfo = require(`../package.json`).license;

module.exports = {
  name: `license`,
  description: `Shows license`,
  execute() {
    console.log(`License: ${packageLicenseInfo}`);
  }
};
