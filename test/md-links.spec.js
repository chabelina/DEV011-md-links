const mdLinks = require('../index.js');


describe('mdLinks', () => {

  it('should return a promise', () => {
    expect(mdLinks()).toBe(typeof Promise);
  });

});
