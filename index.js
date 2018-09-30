'use strict';

const command = require(`./src/command.js`);

if (process.argv.length <= 2) {
  console.log(`
    Привет пользователь!
    Эта программа будет запускать сервер «Кекстаграм».
    Автор: Архипов Валерий.`
  );
} else {
  command.execute(process.argv[2].slice(2));
}
