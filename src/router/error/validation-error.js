'use strict';

module.exports = class ValidateError extends Error {
  constructor(errors) {
    super(`Data validation error`);
    this.errors = errors;
    this.code = 400;
    console.log(errors);
  }
};
