/* const mdLinks = require('../src/cli'); */

const { isRouteValid, isDirectoryOrFile, markDownFile, isThereAnyMarkDown, findLinksFiles, findLinks, getValidate} = require("../src/cli");

/* const isRouteValid = mdLinks.isRouteValid; */
/* const isRouteValid = isRouteValid */
const mdFileRoute = "./files/preambulo.md";
const otherFileRoute = "./files/hola.txt";
const invalidDirRoute = "./files";
const validDirRoute = "./files";

//isRouteValid: test para validar si la ruta dada es valida
describe('¿La ruta es valida?', () => {
  it(`Debe retornar true, pues la ruta es valida`, () => {
      expect(isRouteValid(validDirRoute)).resolves.toEqual(true);
  });
});

describe('¿La ruta es valida?', () => {
  it(`Debe retornar false, pues la ruta es invalida`, () => {
      expect(isRouteValid(invalidDirRoute)).resolves.toEqual(false);
  });
});

//isDirectory or File: test para validar si la ruta es a un directorio o un archivo
describe('¿La ruta es a un directorio o a un archivo?', () => {
  it(`Debe retornar directory, pues la ruta es un directorio`, () => {
      expect(isDirectoryOrFile(validDirRoute)).resolves.toEqual('directory');
  });
});

describe('¿La ruta es a un directorio o a un archivo?', () => {
  it(`Debe retornar file, pues la ruta es un archivo`, () => {
      expect(isDirectoryOrFile(mdFileRoute)).resolves.toEqual('file');
  });
});

//markdownFile: test para validar si la ruta fue enviada a unarchivo .md o no
describe('La ruta es aun archivo, ¿Es .md?', () => {
  it(`Debe retornar true, pues la ruta es a un archivo .md`, () => {
      expect(markDownFile(mdFileRoute)).toBe(true);
  });
});

describe('La ruta es aun archivo, ¿Es .md?', () => {
  it(`Debe retornar false, pues la ruta es a un archivo .txt`, () => {
      expect(markDownFile(otherFileRoute)).toBe(false);
  });
});