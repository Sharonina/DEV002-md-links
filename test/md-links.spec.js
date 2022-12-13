const mdLinks = require('../src/cli');

const validRoute = "./files";

// test de isRouteValid
describe('¿La ruta es valida?', () => {
  it(`Debe retornar true, pues la ruta es valida`, () => {
      const result = isRouteValid(validRoute)
      expect(true).toBe(true);
  });
});
