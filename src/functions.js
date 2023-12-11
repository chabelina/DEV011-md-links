const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const pathConverter = (route) => {
  return path.isAbsolute(route) ? route : path.resolve(route);
}

const isRealRoute = (absolutePath) => {
  return fs.existsSync(absolutePath);
}

const isMdFile = (absolutePath) => {
  extension = path.extname(absolutePath).toLowerCase();
  return extension === '.md';
}

const readAndStore = (validatedPath) => {
  fsPromises.readFile(validatedPath)
    .then()
    .catch()
}

module.exports = {
  pathConverter,
  isRealRoute,
  isMdFile,
};