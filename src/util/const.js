'use strict';

module.exports = {
  name: `utilConst`,
  description: `util const`,
  TEST_DATE: 1540026296000, // Sat, 20 Oct 2018 09:04:56 GMT
  FILE_TYPE: /jpg/,
  MAX_NUMBER_PHOTOS: 100,
  MIN_NUMBER_SCALE: 0,
  MAX_NUMBER_SCALE: 100,
  EFFECTS: [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`],
  MAX_NUMBER_LIKES: 100,
  MAX_STRING_LENGTH: 140,
  MAX_NUMBER_HASHTAGS: 5,
  MIN_HASHTAG_LENGTH: 1,
  MAX_HASHTAG_LENGTH: 20,
  SEVEN_DAY_TO_MSEC: 1000 * 60 * 60 * 24 * 7, // 604800 мсек = 7 дней
};
