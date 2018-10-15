'use strict';

const http = require(`http`);
const url = require(`url`);
const {promisify} = require(`util`);
const fs = require(`fs`);
const readline = require(`readline`);
const pathFinder = require(`path`);

const _stat = promisify(fs.stat);
const _readFile = promisify(fs.readFile);

const DEFAULT_HOST_NAME = `127.0.0.1`;
const DEFAULT_PORT = 3000;

const CONTENT_TYPE = {
  'css': `text/css`,
  'html': `text/html; charset=UTF-8`,
  'jpg': `image/jpeg`,
  'png': `image/png`,
  'gif': `image/gif`,
  'ico': `image/x-icon`
};

const readFile = async (path, res) => {
  const fileExtension = pathFinder.extname(path);

  const data = await _readFile(path);
  res.setHeader(`Content-Type`, CONTENT_TYPE[fileExtension.slice(1)]);
  res.end(data);
};

const rl2 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const askPortNumber = () => new Promise((resolve) => {
  rl2.question(`Укажите номер порта> `,
      (answer) => !isNaN(answer) ? resolve(answer) : askPortNumber());
});

const upServer = (portNumber) => {
  const server = http.createServer((req, res) => {
    const dirName = __dirname.slice(0, -4); // del \src
    const localPath = url.parse(req.url).pathname;
    const absolutPath = dirName + `/static/` + localPath;

    (async () => {
      try {
        const pathStat = await _stat(absolutPath);

        res.statusCode = 200;
        res.statusMessage = `OK`;

        if (pathStat.isDirectory()) {
          await readFile(absolutPath + `index.html`, res); // показать index.html
        } else {
          await readFile(absolutPath, res);
        }
      } catch (e) {
        res.writeHead(404, `Not Found`);
        res.end();
      }
    })().catch((e) => {
      res.writeHead(500, e.message, {
        'Content-Type': `text/plain`
      });
      res.end();
    });
  });

  portNumber = portNumber === `` ? DEFAULT_PORT : portNumber;

  server.listen(portNumber, DEFAULT_HOST_NAME, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Server running at http://${DEFAULT_HOST_NAME}:${portNumber}/`);
  });
};

module.exports = {
  name: `server`,
  description: `server`,
  execute() {

    askPortNumber()
        .then(upServer)
        .catch((err) => {
          console.error(err);
        })
        .then(() => rl2.close());
  }
};
