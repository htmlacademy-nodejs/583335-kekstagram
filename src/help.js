'use strict';

module.exports = {
  name: `help`,
  description: `Shows help`,
  execute() {
    console.log(`
Доступные команды:
--author      — автор приложения;
--description — описание приложения;
--help        — вывод доступных команд;
--license     — лицензия приложения;
--version     — версия приложения;`);
  }
};
