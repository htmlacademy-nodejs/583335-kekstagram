'use strict';

// все модули подгружаются здесь
const author = require(`./author.js`);
const description = require(`./description.js`);
const help = require(`./help.js`);
const license = require(`./license.js`);
const version = require(`./version.js`);
const server = require(`./server.js`);

const colors = require(`colors`);
const logger = require(`./logger`);

const onError = (err) => {
  logger.error(err);
  process.exit(1);
};

colors.setTheme({
  custom: `magenta`,
});

const allCommands = {
  author,
  description,
  help,
  license,
  version,
  server
};

module.exports = {
  name: `command`,
  description: `run command`,
  execute(commandParam) {

    if (allCommands[commandParam]) {
      // команда найдена
      try {
        allCommands[commandParam].execute();
      } catch (err) {
        onError(err);
      }
    } else {
      // ввод неизвестной команды
      logger.error(`Неизвестная команда ${commandParam.custom}`);
      help.execute();
      process.exit(1);
    }

  }
};
