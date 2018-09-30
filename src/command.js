'use strict';

// все модули подгружаются здесь
const author = require(`./author.js`);
const description = require(`./description.js`);
const help = require(`./help.js`);
const license = require(`./license.js`);
const version = require(`./version.js`);

const colors = require(`colors`);

colors.setTheme({
  custom: `magenta`,
});

const allCommands = [
  author,
  description,
  help,
  license,
  version
];

module.exports = {
  name: `command`,
  description: `run command`,
  execute(commandParam) {
    let trueCommand = false;
    for (let i = 0; i < allCommands.length; i++) {
      if (commandParam === allCommands[i].name) {
        trueCommand = true;
        allCommands[i].execute();
        break;
      }
    }

    // ввод неизвестной команды
    if (!trueCommand) {
      console.error(`
      Неизвестная команда ${commandParam.custom}
      `);
      help.execute();
      process.exit(1);
    }

  }
};
