'use strict';

const command = require(`./src/command.js`);
const server = require(`./src/server.js`);
// const readline = require(`readline`);
// const fs = require(`fs`);

const onError = (err) => {
  console.error(err);
  process.exit(1);
};

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: `>>>`
// });

// const askGenerateData = () => new Promise((resolve, reject) => {
//   rl.question(`Сгенерировать данные? (y/n)> `,
//       (answer) => answer.toLowerCase() === `y` ? resolve() : reject(`Генерация данных отменена`));
// });

// const askQuantity = () => new Promise((resolve) => {
//   rl.question(`Cколько элементов нужно создать? (1,2,3...)> `,
//       (answer) => !isNaN(answer) ? resolve(answer) : askQuantity());
// });

// const askFilePath = (quantity) => new Promise((resolve) => {
//   rl.question(`Укажите путь до файла> `,
//       (answer) => resolve([quantity, answer]));
// });

// const askFileName = ([quantity, filePath]) => new Promise((resolve) => {
//   rl.question(`укажите название файла> `,
//       (answer) => resolve([quantity, filePath, answer]));
// });

// const askRewrite = ([quantity, filePath, fileName]) => new Promise((resolve, reject) => {
//   if (filePath === ``) {
//     resolve([quantity, filePath, fileName]);
//   } else {
//     fs.readdir(filePath, (err, files) => {
//       if (err) {
//         reject(`Генерация данных отменена`);
//       }

//       if (files.indexOf(fileName) === -1) { // файл не найден
//         resolve([quantity, filePath, fileName]);
//       } else {
//         rl.question(`Файл уже существует, перезаписать? (y/n)> `,
//             (answer) => answer.toLowerCase() === `y` ? resolve([quantity, filePath, fileName]) : reject(`Генерация данных отменена`));
//       }
//     });
//   }
// });
//
// const createFile = ([quantity, filePath, fileName]) => {
//   createFileEntity.execute([quantity, filePath, fileName]);
// };


const handleInitCommands = ([, , cmd]) => {
  if (!cmd) {
    console.log(`
      Привет пользователь!
      Эта программа будет запускать сервер «Кекстаграм».
      Автор: Архипов Валерий.`
    );

    server.execute();
    // askGenerateData()
    //     .then(askQuantity)
    //     .then(askFilePath)
    //     .then(askFileName)
    //     .then(askRewrite)
    //     .then(createFile)
    //     .then(() => console.log(`file created`))
    //     .catch((err) => {
    //       console.error(err);
    //     })
    //     .then(() => rl.close());

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

// проверка пути D:\    temp.txt

