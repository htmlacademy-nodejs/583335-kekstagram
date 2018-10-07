'use strict';
const MIN_NUMBER = 0; // мин число
const MAX_NUMBER_SCALE = 100; // макс число уровня эффекта
const MAX_NUMBER_LIKES = 1000; // макс число лайков
const MAX_NUMBER_HASHTAGS = 5; // макс число #
const MAX_LENGTH_DESCRIPTION = 140; // макс число #
const SEVEN_DAY_TO_MSEC = 1000 * 60 * 60 * 24 * 7; // 604800 мсек = 7 дней

const assert = require(`assert`); // core module
const genE = require(`../src/generateEntity.js`).execute(); // module func
const E = genE(); // module Entity

describe(`generateEntity`, () => {
  describe(`#generateEntity()`, () => {
    it(`Функция срабатывает без ошибок`, () => {
      assert.doesNotThrow(genE, `missing foo`, `did not throw with expected message`);
    });
  });

  describe(`#entity`, () => {

    it(`Возвращает объект`, () => {
      assert.equal(typeof E, `object`);
    });

    it(`url 600x600`, () => {
      assert(E.url.indexOf(`http`) > -1);
      assert(E.url.indexOf(`/600/`) > -1);
    });

    it(`scale: от 0 до 100`, () => {
      assert(E.scale >= MIN_NUMBER && E.scale <= MAX_NUMBER_SCALE);
    });

    it(`effectт: 'none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'`, () => {
      assert([`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`].indexOf(E.effect) > -1);
    });

    it(`hashtags: 5`, () => {
      assert(Array.isArray(E.hashtags));
      assert(E.hashtags.length >= MIN_NUMBER && E.hashtags.length <= MAX_NUMBER_HASHTAGS);
    });

    it(`description: длина менее 140`, () => {
      assert(E.description.length <= MAX_LENGTH_DESCRIPTION);
    });

    it(`likes: от 0 до 1000`, () => {
      assert(E.likes >= MIN_NUMBER && E.likes <= MAX_NUMBER_LIKES);
    });


    it(`comments: isArray && comments: длина каждого элемента менее 140`, () => {
      assert(Array.isArray(E.comments));

      const validateLengthItem = (it) => {
        assert(it.length <= MAX_LENGTH_DESCRIPTION);
      };

      E.comments.forEach((it) => validateLengthItem(it));
    });

    it(`date: from (now - 7) to now`, () => {
      const t2 = Date.now(); // сейчас
      const t1 = t2 - SEVEN_DAY_TO_MSEC; // сейчас минус 7 дней

      assert(E.date >= t1 && E.date <= t2);
    });

  });

});
