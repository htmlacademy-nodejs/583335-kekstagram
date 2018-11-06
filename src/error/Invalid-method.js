'use strict';

const logger = require(`../logger`);

module.exports = class InvalidMethod extends Error {
  constructor(message) {
    super(message);
    this.code = 501;
    logger.error(`invalid-method-error:  ${message}`, message);
  }
};
