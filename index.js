'use strict';

if (process.argv.length <= 2) {
  console.log(`
    Привет пользователь!
    Эта программа будет запускать сервер «Кекстаграм».
    Автор: Архипов Валерий.`
  );
} else {
  switch (process.argv[2]) {
    case `--version`:
      console.log(`v0.0.1`);
      break;

    case `--help`:
      console.log(`
    Доступные команды:
  --help    — печатает этот текст;
  --version — печатает версию приложения;`
      );
      break;

    default:
      console.error(`
  Неизвестная команда ${process.argv[2]}.
  Чтобы прочитать правила использования приложения, наберите "--help"`
      );
      process.exit(1);
      break;
  }
}
