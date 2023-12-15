const mdLinks = require('../index.js');

describe('mdLinks', () => {

  it('should return a promise', () => {
    console.log(mdLinks("docs/03-milestone.md"));
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

});

