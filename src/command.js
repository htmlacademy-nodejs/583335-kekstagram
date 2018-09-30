'use strict';

const author = require(`./author.js`);
const description = require(`./description.js`);
const help = require(`./help.js`);
const license = require(`./license.js`);
const version = require(`./version.js`);


const commands = [
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
    for (let i = 0; i < commands.length; i++) {
      if (commandParam === commands[i].name) {
        trueCommand = true;
        commands[i].execute();
        break;
      }
    }

    // ввод неизвестной команды
    if (!trueCommand) {
      console.error(`
      Неизвестная команда ${commandParam}
      `);
      help.execute();
      process.exit(1);
    }

  }
};
