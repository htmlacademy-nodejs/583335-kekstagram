'use strict';

module.exports = {
  name: `utilFunc`,
  description: `util function`,
  getRandomInteger(max) { // случайное число от 0 до max-1 включительно
    return Math.floor(Math.random() * (max + 1));
  },
};
