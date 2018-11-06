'use strict';

const logger = require(`../logger`);

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.code = 404;
    logger.error(`not-found-error:  ${message}`, message);
  }
};
