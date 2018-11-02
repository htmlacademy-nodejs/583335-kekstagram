'use strict';

const command = require(`./src/command.js`);
const server = require(`./src/server.js`);

const onError = (err) => {
  console.error(err);
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
process.on(`uncaughtException`, (err) => console.log(`Caught exveption: ${err}\n`));

handleInitCommands(process.argv);
