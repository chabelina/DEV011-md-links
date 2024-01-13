const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const markdownIt = require('markdown-it');
const md = new markdownIt();
const axios = require('axios');

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
      const fileContent = result;
      const parsedFileContent = mdParser(fileContent);
      
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
      return linkList;
    })
    .catch((error) => {
      throw new Error('Could not read the file!');
    })
}

const httpStatusValidator = (url) => {
  return axios.get(url)
    .then((res) => {
      let validationData = {};
      if (res.status >= 200 && res.status < 300){
        validationData.statCode = res.status;
        validationData.isOk = 'ok';
      } else {
        validationData.statCode = res.status;
        validationData.isOk = "fail";
      }
      // console.log('El valor de data validada es:',validationData);
      return validationData;
    })
    .catch((error) => {
      throw new Error("Could not validate URL!");
    })
}

const getStats = (validatedLinksArray) => {
  
  const totalLinks = validatedLinksArray.length;
  const unique = new Set(validatedLinksArray.map((object) => object.href)).size;
  let failed = 0;

  for (let i = 0; i < validatedLinksArray.length; i++) {
    if (validatedLinksArray[i].ok !== "ok") {
      failed++;
    }
  }
  return { totalLinks: totalLinks, uniqueLinks: unique, failedLinks: failed };
}

module.exports = {
  pathConverter,
  isRealRoute,
  isMdFile,
  fileReader,
  mdParser,
  httpStatusValidator,
  getStats
};