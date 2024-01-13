const {
  pathConverter,
  fileReader,
  mdParser,
  httpStatusValidator,
} = require("../src/functions.js");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

jest.mock("../src/functions", () => ({
  ...jest.requireActual("../src/functions"),
  mdParser: jest.fn(),
}));

describe("pathConverter", () => {
  it("should return the absolute path for a relative input path", () => {
    const relativePath = "docs/04-milestone.md";
    const result = pathConverter(relativePath);
    const expectedAbsolutePath = path.resolve(relativePath);
    expect(result).toEqual(expectedAbsolutePath);
  });

  it("should return the same path if input is already absolute", () => {
    const alreadyAbsolutePath =
      "D:/Proyectos/DEV011-md-links/docs/04-milestone.md";
    const result = pathConverter(alreadyAbsolutePath);
    expect(result).toEqual(alreadyAbsolutePath);
  });
});

describe("fileReader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("should read and parse a file with links correctly", async () => {
    // Arrange
    const validatedPath = "/path/to/validated/file.md";
    const fileContent =
      "This is a [sample link](https://example.com) in a file.";
    const parsedContent = [
      { content: "This is a [sample link](https://example.com)" },
    ];
    mdParser 
    jest.spyOn(fs.promises, "readFile").mockResolvedValue(fileContent);
    mdParser.mockReturnValue(parsedContent);

    mdParser(fileContent);
      
    // Act
    const result = await fileReader(validatedPath);

    // Assert
    expect(result).toEqual([
      { href: "https://example.com", text: "sample link", file: validatedPath },
    ]);
    expect(fsPromises.readFile).toHaveBeenCalledWith(validatedPath, {
      encoding: "utf8",
    });
    expect(mdParser).toHaveBeenCalledWith(fileContent);
  });
  it("should handle file reading error", async () => {
    // Arrange
    const validatedPath = "/path/to/invalid/file.md";
    const errorMessage = "File reading error!";
    fsPromises.readFile.mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(fileReader(validatedPath)).rejects.toThrow(
      "Could not read the file!"
    );
    expect(fsPromises.readFile).toHaveBeenCalledWith(validatedPath, {
      encoding: "utf8",
    });
    expect(mdParser).not.toHaveBeenCalled();
  });
});

describe("httpStatusValidator", () => {
  it("should resolve promise with an object", () => {
    const url = "https://www.youtube.com/";
    httpStatusValidator(url).then((result) => {
      expect(result).toBeInstanceOf(Object);
    });
  });
  it("the resulting object's 'ok' property value should be 'fail' if the URL's HTTP request returns an error", () => {
    const url = 'http://fakeurl.com';
    httpStatusValidator(url).then((result) => {
      const okPropertyValue = result[0].isOk;
      expect(okPropertyValue).toEqual('fail');
    });
  });
});



