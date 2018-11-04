'use strict';

require(`dotenv`).config();

const command = require(`./src/command.js`);
const server = require(`./src/server.js`);
const logger = require(`./src/logger`);

const onError = (err) => {
  logger.error(err);
  process.exit(1);
};

const handleInitCommands = ([, , cmd]) => {
  if (!cmd) {
    console.log(`
      Привет пользователь!
      Эта программа будет запускать сервер «Кекстаграм».
      Автор: Архипов Валерий.`
    );

    server.execute();

  } else {
    try {
      command.execute(process.argv[2].slice(2));
    } catch (err) {
      onError(err);
    }
  }
};

// обработать все неподписанные ошибки
process.on(`uncaughtException`, (err) => logger.error(`Caught exception: ${err}\n`));

handleInitCommands(process.argv);
