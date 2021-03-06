'use strict';

const getRandomInteger = require(`../../src/util/func.js`).getRandomInteger;

const {
  MAX_NUMBER_PHOTOS,
  MAX_NUMBER_SCALE,
  EFFECTS,
  MAX_NUMBER_LIKES,
  MAX_STRING_LENGTH,
  MAX_NUMBER_HASHTAGS,
  SEVEN_DAY_TO_MSEC,
} = require(`../../src/util/const.js`);

const STR = `массив строк не более 5 элементов каждая строка начинается с символа должно содержать одно слово без пробелов слова должны повт`;

const WORDS = STR.split(/[\s]+/);

const getEffect = () => {
  return EFFECTS[getRandomInteger(EFFECTS.length - 1)];
};

const getString = () => {
  return STR.slice(getRandomInteger(MAX_STRING_LENGTH));
};

const getHashtags = () => {
  let arr = [];
  const maxNumberTag = getRandomInteger(MAX_NUMBER_HASHTAGS);

  // создание массива хештегов
  for (let i = 0; i < maxNumberTag; i++) {
    arr[i] = `#${WORDS[getRandomInteger(WORDS.length - 1)]}`;
  }

  // делаем проверку и возвращаем массив
  return arr
    .map((it, i, arrParam) => {
      it = arrParam.indexOf(it, i + 1) > -1 ? `` : it; // проверка на совпадения
      it = it.length <= 20 ? it : ``; // проверка на длину
      return it;
    })
    .filter((tag) => { // удаляем пустые хештеги
      return tag !== ``;
    });
};

const getComments = () => {
  let Arr = [];
  const numberComments = getRandomInteger(MAX_NUMBER_HASHTAGS);

  for (let i = 0; i < numberComments; i++) {
    Arr[i] = getString();
  }

  return Arr;
};

const getDate = () => { // дата = случайное число в интервале от сейчас минус 7 дней
  // случайное время в течении 7 дней
  const randomTime = getRandomInteger(SEVEN_DAY_TO_MSEC);
  return Date.now() - randomTime;
};


const generateEntity = () => {
  const entity = {
    url: `https://picsum.photos/600/${getRandomInteger(MAX_NUMBER_PHOTOS)}.png`,
    description: getString(),
    effect: getEffect(),
    hashtags: getHashtags(),
    comments: getComments(),
    likes: getRandomInteger(MAX_NUMBER_LIKES),
    scale: getRandomInteger(MAX_NUMBER_SCALE),
    date: getDate()
  };

  return entity;
};

module.exports = {
  name: `generateEntity`,
  description: `generateEntity`,
  generateEntity
};
