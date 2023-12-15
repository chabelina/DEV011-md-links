const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const markdownIt = require('markdown-it');
const md = new markdownIt();

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

const mdParser = (content) => {
  const parseTree = md.parse(content);
  // console.log(JSON.stringify(parseTree, null, 2));
  return parseTree;
}

const fileReader = (validatedPath) => {
  return fsPromises.readFile(validatedPath, {encoding: 'utf8'})
    .then((result) => {
      const content = result;
      const parsedFileContent = mdParser(content);
      
      let linkList = []

      parsedFileContent.forEach((token) => {
        let text;
        let href;

        const tokenContent = token.content;
        const regex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;
        let foundLinkData = regex.exec(tokenContent);

        while(foundLinkData !== null){
          text = foundLinkData[1];
          href = foundLinkData[2];

          linkList.push({href,text, file:validatedPath})
          foundLinkData = regex.exec(tokenContent);
        }
      });
      console.log(linkList);
      return linkList;
    })
    .catch((error) => {
      throw new Error('Could not read the file!');
    })
}

module.exports = {
  pathConverter,
  isRealRoute,
  isMdFile,
  fileReader,
  mdParser
};