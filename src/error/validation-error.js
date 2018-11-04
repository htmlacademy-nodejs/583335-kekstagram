'use strict';

const logger = require(`../logger`);

module.exports = class ValidateError extends Error {
  constructor(err) {
    super(`Data validation error`);
    this.errors = err;
    this.code = 400;
    logger.error(`ValidateError: ${err}`, err);
  }
};
