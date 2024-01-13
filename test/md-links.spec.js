const { mdLinks } = require('../index.js');

describe('mdLinks', () => {

  // jest.spyOn(mdLinks, "mdLinks").mockResolvedValue(fileContent);

  it('should return a promise', () => {
    expect(mdLinks("docs/03-milestone.md")).toBeInstanceOf(Promise);
  });
  it('should reject the promise if the path does not exist', () => {
    return mdLinks("/D/Noexiste/DEV011-md-links/docs/02-milestone.md").catch((error) => {
      expect(error.message).toMatch('The input path does not exist! No file found.');
    });
  });
  it('should reject the promise if the path is not markdown', () => {
    return mdLinks('D:/Proyectos/DEV011-md-links/index.js').catch(
      (error) => {
      expect(error.message).toMatch('The input path leads to a non-markdown file! Please provide a valid file.');
    });
  });
  it("should return an array of objects without validation and stats options", () => {
    const path = "D:/Proyectos/DEV011-md-links/docs/04-milestone.md";
    const validate = false;
    const stats = false;

    return mdLinks(path, validate, stats).then((result) => {
      expect(result).toHaveLength(5); 
      expect(result[0]).not.toHaveProperty("ok");
      expect(result[0]).not.toHaveProperty("status");
    });
  });
  it("should return an array of objects with 'ok' and 'status' with use of validation option", () => {
    const path = "D:/Proyectos/DEV011-md-links/docs/04-milestone.md";
    const validate = true;
    const stats = false;

    return mdLinks(path, validate, stats).then((result) => {
      expect(result).toHaveLength(5);
      expect(result[0]).toHaveProperty("ok");
      expect(result[0]).toHaveProperty("status");
    });
  })

});

