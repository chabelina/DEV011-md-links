const {
  pathConverter,
  isRealRoute,
  isMdFile,
  fileReader,
  httpStatusValidator,
  statisticsCalculator,
} = require("./src/functions.js");

const mdLinks = (path, validate, stats) => {
  return new Promise((resolve, reject) => {
    //check if path is absolute, convert if isn't. return the absolutePath
    const absolutePath = pathConverter(path);
    //validate if route directory exists in PC and if resulting file is Markdown
    const isFound = isRealRoute(absolutePath);
    const isMD = isMdFile(absolutePath);

    if (isFound && isMD) {
      //read md file and extract link array within resolved promise
      const linkListPromise = fileReader(absolutePath);

      linkListPromise.then((linkListArray) => {
        let aux = [];
        //resolve the promise with the object of links depending on wether or not the
        //validate param is being used
        // const resultArr = []
        linkListArray.forEach((object) => {
          const httpValidationPromises = httpStatusValidator(object.href)
          .then((res) => res)
          .catch((error) => error);
          
          aux.push(httpValidationPromises);
        });
        
        Promise.all(aux)
        .then((httpValidationResults) => {
          const statResults = statisticsCalculator(httpValidationResults);

          if (validate && !stats) {
            httpValidationResults.forEach((data, index) => {
              linkListArray[index].status = data.statCode;
              linkListArray[index].ok = data.isOk;
            });
            resolve(linkListArray );
          }
          else if (stats && !validate) {
            resolve(statResults);
          }
          else {
            resolve({ statResults, linkListArray });
          }
         
        });
      });
    } else if (!isFound) {
      reject(new Error("The input path does not exist! No file found."));
    } else if (!isMD) {
      reject(
        new Error(
          "The input path leads to a non-markdown file! Please provide a valid file."
        )
      );
    }
    // console.log('archivo fue encontrado?',isFound);
    //read md file
  });
};

module.exports = { mdLinks };
