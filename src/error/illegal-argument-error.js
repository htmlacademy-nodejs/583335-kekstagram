'use strict';

const logger = require(`../logger`);

module.exports = class IllegalArgumentError extends Error {
  constructor(message) {
    super(message);
    this.code = 400;
    logger.error(`illegal-argument-error:  ${message}`, message);
  }
};
