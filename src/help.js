'use strict';

// все модули подгружаются здесь
const author = require(`./author.js`);
const description = require(`./description.js`);
const license = require(`./license.js`);
const version = require(`./version.js`);

const allCommands = [
  author,
  description,
  license,
  version
];

module.exports = {
  name: `help`,
  description: `Shows help`,
  execute() {

    console.log(`
    Доступные команды:
    `);

    allCommands.forEach((item) => {
      let itemNameStr = `${item.name}`;

      // выравнивание описание в строке
      const itemNameStartLength = itemNameStr.length;

      for (let i = 0; i < (11 - itemNameStartLength); i++) {
        itemNameStr += ` `;
      }

      console.log(`--${itemNameStr.grey} — ${item.description.green}`);
    });

    // вывод описания "help"
    const nameColor = `help`.grey;
    const descriptionColor = `Shows help`.green;
    console.log(`--${nameColor}        — ${descriptionColor}`);
  }
};
