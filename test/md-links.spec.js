/* const mdLinks = require('../src/cli'); */

const {
  isRouteValid,
  isDirectoryOrFile,
  markDownFile,
  isThereAnyMarkDown,
  findLinksFiles,
  findLinks,
  getValidate,
  mdlinks,
  totalLinks,
} = require("../src/cli");

const nolinksFile = "./files/nohaylinks.md";
const txtFileRoute = "./files/hola.txt";
const mdFileRoute = "./files/preambulo.md";
const invalidDirRoute = "./filess";
const validDirRoute = "./files";
const specificRoute = "./files/objetivos_aprendizaje";
const mdFilesMiniList = ["./files/objetivos_aprendizaje/http.md"];
const mdFilesList = [
  "files/objetivos_aprendizaje/http.md",
  "files/objetivos_aprendizaje/js.md",
  "files/objetivos_aprendizaje/node.md",
  "files/objetivos_aprendizaje/vasiones.md",
];
const miniListLinks = [
  {
    name: "Generalidades del protocolo HTTP - MDN",
    url: "https://developer.mozilla.org/es/docs/Web/HTTP/Overview",
    linkRoute: "./files/objetivos_aprendizaje/http.md",
  },
  {
    name: "Mensajes HTTP - MDN",
    url: "https://developer.mozilla.org/es/docs/Web/HTTP/Messages",
    linkRoute: "./files/objetivos_aprendizaje/http.md",
  },
  {
    name: "Códigos de estado de respuesta HTTP - MDN",
    url: "https://developer.mozilla.org/es/docs/Web/HTTP/Status",
    linkRoute: "./files/objetivos_aprendizaje/http.md",
  },
  {
    name: "The Complete Guide to Status Codes for Meaningful ReST APIs - dev.to",
    url: "https://dev.to/khaosdoctor/the-complete-guide-to-status-codes-for-meaningful-rest-apis-1-5c5",
    linkRoute: "./files/objetivos_aprendizaje/http.md",
  },
];
const validateMiniListLinks2 = [
  {
    name: "Generalidades del protocolo HTTP - MDN",
    url: "https://developer.mozilla.org/es/docs/Web/HTTP/Overview",
    linkRoute: "./files/objetivos_aprendizaje/http.md",
    valid: { responseCode: "Z_BUF_ERROR", statusText: "Failed" },
  },
  {
    name: "Mensajes HTTP - MDN",
    url: "https://developer.mozilla.org/es/docs/Web/HTTP/Messages",
    linkRoute: "./files/objetivos_aprendizaje/http.md",
    valid: { responseCode: "Z_BUF_ERROR", statusText: "Failed" },
  },
  {
    name: "Códigos de estado de respuesta HTTP - MDN",
    url: "https://developer.mozilla.org/es/docs/Web/HTTP/Status",
    linkRoute: "./files/objetivos_aprendizaje/http.md",
    valid: { responseCode: "Z_BUF_ERROR", statusText: "Failed" },
  },
  {
    name: "The Complete Guide to Status Codes for Meaningful ReST APIs - dev.to",
    url: "https://dev.to/khaosdoctor/the-complete-guide-to-status-codes-for-meaningful-rest-apis-1-5c5",
    linkRoute: "./files/objetivos_aprendizaje/http.md",
    valid: { responseCode: 200, statusText: "OK" },
  },
];
const validMinilistLinks = [
  {
    name: "Markdown",
    url: "https://es.wikipedia.org/wiki/Markdown",
    linkRoute:
      "/Users/sharonina/Documents/laboratoria/DEV002-md-links/files/preambulo.md",
    valid: { responseCode: 200, statusText: "OK" },
  },
  {
    name: "Node.js",
    url: "https://nodejs.org/",
    linkRoute:
      "/Users/sharonina/Documents/laboratoria/DEV002-md-links/files/preambulo.md",
    valid: { responseCode: "Z_BUF_ERROR", statusText: "Failed" },
  },
  {
    name: "md-links",
    url: "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg",
    linkRoute:
      "/Users/sharonina/Documents/laboratoria/DEV002-md-links/files/preambulo.md",
    valid: { responseCode: 200, statusText: "OK" },
  },
];
const otherMiniList = [
  {
    name: "Markdown",
    url: "https://es.wikipedia.org/wiki/Markdown",
    linkRoute:
      "/Users/sharonina/Documents/laboratoria/DEV002-md-links/files/preambulo.md",
  },
  {
    name: "Node.js",
    url: "https://nodejs.org/",
    linkRoute:
      "/Users/sharonina/Documents/laboratoria/DEV002-md-links/files/preambulo.md",
  },
  {
    name: "md-links",
    url: "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg",
    linkRoute:
      "/Users/sharonina/Documents/laboratoria/DEV002-md-links/files/preambulo.md",
  },
];

const validateMiniListLinks = [
  {
    name: "Generalidades del protocolo HTTP - MDN",
    url: "https://developer.mozilla.org/es/docs/Web/HTTP/Overview",
    linkRoute: "files/objetivos_aprendizaje/http.md",
    valid: { responseCode: "Z_BUF_ERROR", statusText: "Failed" },
  },
  {
    name: "Mensajes HTTP - MDN",
    url: "https://developer.mozilla.org/es/docs/Web/HTTP/Messages",
    linkRoute: "files/objetivos_aprendizaje/http.md",
    valid: { responseCode: "Z_BUF_ERROR", statusText: "Failed" },
  },
  {
    name: "Códigos de estado de respuesta HTTP - MDN",
    url: "https://developer.mozilla.org/es/docs/Web/HTTP/Status",
    linkRoute: "files/objetivos_aprendizaje/http.md",
    valid: { responseCode: "Z_BUF_ERROR", statusText: "Failed" },
  },
  {
    name: "The Complete Guide to Status Codes for Meaningful ReST APIs - dev.to",
    url: "https://dev.to/khaosdoctor/the-complete-guide-to-status-codes-for-meaningful-rest-apis-1-5c5",
    linkRoute: "files/objetivos_aprendizaje/http.md",
    valid: { responseCode: 200, statusText: "OK" },
  },
];

//isRouteValid: test para validar si la ruta dada es valida
describe("¿La ruta es valida?", () => {
  it(`Debe retornar true, pues la ruta es valida`, () => {
    expect(isRouteValid(validDirRoute)).resolves.toEqual(true);
  });
  it(`Debe retornar false, pues la ruta es invalida`, () => {
    expect(isRouteValid(invalidDirRoute)).rejects.toEqual(false);
  });
});

//isDirectory or File: test para validar si la ruta es a un directorio o un archivo
describe("¿La ruta es a un directorio o a un archivo?", () => {
  it(`Debe retornar directory, pues la ruta es un directorio`, () => {
    expect(isDirectoryOrFile(validDirRoute)).resolves.toEqual("directory");
  });
  it(`Debe retornar file, pues la ruta es un archivo`, () => {
    expect(isDirectoryOrFile(mdFileRoute)).resolves.toEqual("file");
  });
});

//markdownFile: test para validar si la ruta fue enviada a unarchivo .md o no
describe("La ruta es aun archivo, ¿Es .md?", () => {
  it(`Debe retornar false, pues la ruta es a un archivo .txt`, () => {
    expect(markDownFile(txtFileRoute)).rejects.toEqual(false);
  });

  it(`Debe retornar true, pues la ruta es a un archivo .md`, () => {
    expect(markDownFile(mdFileRoute)).resolves.toEqual(true);
  });
});

//isThereAnyMarkDown: test para validar que la carpeta contiene archivos .md
describe("¿Hay archivos .md en el directorio?", () => {
  it(`Debe retornar un array con los nombres de archivos .md`, () => {
    expect(isThereAnyMarkDown(specificRoute)).resolves.toEqual(mdFilesList);
  });
});

//findLinksFiles: Test para encontrar los links que tiene un archivo .md
describe("¿Hay links en la lista de archivos?", () => {
  it(`Debe retornar una lista de objetos que contienen los links`, () => {
    expect(findLinksFiles(mdFilesMiniList)).resolves.toEqual(miniListLinks);
  });
});

describe("¿Hay links en el archivo?", () => {
  it(`Debe retornar una lista de objetos que contienen los links`, () => {
    expect(findLinks(mdFilesMiniList[0])).resolves.toEqual(miniListLinks);
  });
  it(`Debe retornar que no hay links en la ruta, a pesar de ser un .md`, () => {
    expect(findLinks(nolinksFile)).rejects.toEqual("no hay links");
  });
});

//getValidate: Test para la validacion de los links
describe("¿Los links de los archivos son validos o invalidos?", () => {
  it(`Debe retornar una lista de objetos que contienen la validacion de los links`, () => {
    expect(getValidate(miniListLinks)).resolves.toEqual(validateMiniListLinks2);
  });
});

//mdLinks
describe("Buscar los links en la ruta entregada", () => {
  it(`Debe retornar una lista de objetos que contienen links encontrados en archivos .md`, () => {
    expect(mdlinks(mdFilesMiniList[0])).resolves.toEqual(otherMiniList);
  });
  it(`Debe retornar una lista de objetos que contienen links encontrados en archivos .md`, () => {
    expect(mdlinks(mdFilesMiniList[0], true)).resolves.toEqual(
      validMinilistLinks
    );
  });
});

//--stats y --validate
describe("Debe retornar el numero total de links en la ruta", () => {
  it(`Debe retornar el numero total de links y los links unicos`, () => {
    expect(totalLinks(otherMiniList)).toStrictEqual({ total: 3, unique: 3 });
  });

  it(`Debe retornar el numero total de links, los links unicos y los links rotos`, () => {
    expect(totalLinks(validateMiniListLinks, true)).toStrictEqual({
      total: 4,
      unique: 4,
      broken: 3,
    });
  });
});
