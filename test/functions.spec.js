const { mdParser, fileReader } = require("../src/functions.js");
const fs = require("fs");
const fsPromises = fs.promises;


describe('mdParser', () => {
  it('should log a parseTree to the console', () => {
    return fsPromises.readFile("D:/Proyectos/DEV011-md-links/docs/01-milestone.md", 'utf8')
      .then((result) => {
        const content = result;
        mdParser(content);
        expect(console.log).toHaveBeenCalled();
      });
  });
});

describe("fileReader", () => {
  it("should log md file's content to the console", () => {
    return fileReader("D:/Proyectos/DEV011-md-links/docs/04-milestone.md")
    .then((result) => {
        expect(console.log).toHaveBeenCalled();
      }
    );
  });
});