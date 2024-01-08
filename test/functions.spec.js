const { mdParser, fileReader } = require("../src/functions.js");
const fs = require("fs");
const path = require('path');
const fsPromises = fs.promises;

describe('pathConverter', () => {
  it('should return the absolute path for a relative input path', () => {
    const relativePath = "docs/04-milestone.md";
    const result = pathConverter(relativePath);
    const expectedAbsolutePath = path.resolve(relativePath);
    expect(result).toEqual(expectedAbsolutePath);
  });

  it("should return the same path if it is already absolute", () => {
    const alreadyAbsolutePath =
      "D:/Proyectos/DEV011-md-links/docs/04-milestone.md";
    const result = pathConverter(alreadyAbsolutePath);
    expect(result).toEqual(alreadyAbsolutePath);
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