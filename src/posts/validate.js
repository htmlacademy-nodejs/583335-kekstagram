'use strict';

const ValidateError = require(`../error/validation-error`);

const {
  FILE_TYPE,
  MIN_NUMBER_SCALE,
  MAX_NUMBER_SCALE,
  EFFECTS,
  MAX_STRING_LENGTH,
  MAX_NUMBER_HASHTAGS,
  MIN_HASHTAG_LENGTH,
  MAX_HASHTAG_LENGTH,
} = require(`../util/const.js`);

const validationHashTag = {
  checkLength(list) {
    return list.length > MAX_NUMBER_HASHTAGS;
  },

  checkFirstCharacter(list) {
    return list.some((hash) => hash[0] !== `#`);
  },

  lengthWord(list) {
    return list.some((hash) => hash.length < MIN_HASHTAG_LENGTH + 1 || hash.length > MAX_HASHTAG_LENGTH);
  },

  checkRepeat(list) {
    return list
      .map((hash) => hash.toLowerCase())
      .some((hash) => list.indexOf(hash) !== list.lastIndexOf(hash));
  }
};

const validate = (data) => {
  const errors = [];

  const setError = (field, message) => errors.push({
    error: `Validation Error`,
    fieldName: field,
    errorMessage: message
  });

  if (data.filename) {
    if (!FILE_TYPE.test(data.filename)) {
      setError(`file`, `Field 'filename' must be a image type!`);
    }
  } else {
    setError(`file`, `Field 'filename' is required!`);
  }

  if (data.scale !== undefined) {
    if (data.scale < MIN_NUMBER_SCALE || data.scale > MAX_NUMBER_SCALE) {
      setError(`scale`, `Field 'scale' must be in range from ${MIN_NUMBER_SCALE} to ${MAX_NUMBER_SCALE}!`);
    }
  } else {
    setError(`scale`, `Field 'scale' is required!`);
  }

  if (data.effect) {
    if (!EFFECTS.includes(data.effect)) {
      setError(`effect`, `Field 'effect' must be one of the following: ${EFFECTS.join(`, `)}!`);
    }
  } else {
    setError(`effect`, `Field 'effect' is required!`);
  }

  if (data.description && data.description > MAX_STRING_LENGTH) {
    setError(`description`, `Field 'description' must be less then ${MAX_STRING_LENGTH} charsets!`);
  }

  if (data.hashtags) {
    const list = data.hashtags.trim().split(/[\s]+/);

    if (validationHashTag.checkLength(list)) {
      setError(`hashtags`, `Field 'hashtags' must be less then ${MAX_NUMBER_HASHTAGS} hashtags!`);
    }

    if (validationHashTag.checkFirstCharacter(list)) {
      setError(`hashtags`, `All hashtags must checkFirstCharacter with '#' symbol!`);
    }

    if (validationHashTag.lengthWord(list)) {
      setError(`hashtags`, `All hashtags length must be in range from ${MIN_HASHTAG_LENGTH} to ${MAX_HASHTAG_LENGTH}!`);
    }

    if (validationHashTag.checkRepeat(list)) {
      setError(`hashtags`, `All hashtags must be unique!`);
    }
  }

  if (errors.length) {
    throw new ValidateError(errors);
  }

  return data;
};

module.exports = validate;
