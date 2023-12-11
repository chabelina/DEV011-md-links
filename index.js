const { pathConverter, isRealRoute, isMdFile } = require("./src/functions.js");

const mdLinks = (path) => {
return new Promise((resolve, reject) => {
  //check if path is absolute, convert if isn't. return the absolutePath
  const absolutePath = pathConverter(path);
  //validate if route directory exists in PC and if resulting file is Markdown
  const isFound = isRealRoute(absolutePath);
  const isMD = isMdFile(absolutePath);

  if(isFound && isMD){
    //read md file and search for links
    

    //resolve the promise with the object of links
    resolve(absolutePath)
  } else if (!isFound) {
    reject(new Error('The input path does not exist! No file found.'));
  } else if (!isMD) {
    reject(new Error('The input path leads to a non-markdown file! Please provide a valid file.'));
  }
  // console.log('archivo fue encontrado?',isFound);
  //read md file
})
}

module.exports = mdLinks;

