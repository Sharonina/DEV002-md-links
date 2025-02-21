const fs = require("fs");
const axios = require("axios").default;
const reExp = /\[([^\]]+)\]\(([^)]+)\)/g;
const path = require("path");
const route = "./files";
const mdFiles = [];

/* Evaluar si la ruta es o no valida */
function isRouteValid(route) {
  const isRouteValidPromise = new Promise(function (resolve, reject) {
    fs.access(route, (e) => {
      if (e) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
  return isRouteValidPromise;
}

/* Validar si es o no un directorio*/
function isDirectoryOrFile(route) {
  const isDirectoryOrFilePromise = new Promise(function (resolve, reject) {
    fs.stat(route, (e, data) => {
      if (data.isDirectory()) {
        resolve("directory");
      } else {
        resolve("file");
      }
    });
  });
  return isDirectoryOrFilePromise;
}

/* Evaluar si la ruta fue directo a un archivo .md*/
function markDownFile(route) {
  const markDownFilePromise = new Promise(function (resolve, reject) {
    if (path.extname(route) == ".md") {
      mdFiles.push(route);
    }
    if (mdFiles.length >= 1) {
      resolve(true);
    } else {
      reject(false);
    }
  });
  return markDownFilePromise;
}

/* Buscar los archivos .md en un directorio*/
function isThereAnyMarkDown(route) {
  return new Promise(function (resolve, reject) {
    fs.readdir(route, (e, data) => {
      Promise.all(
        data.map((fileOrDirectory) => {
          return new Promise((resolve, reject) => {
            const statPath = path.join(route, fileOrDirectory);
            fs.lstat(statPath, (e, stat) => {
              if (stat.isDirectory()) {
                return isThereAnyMarkDown(statPath).then(resolve);
              }
              resolve([statPath]);
            });
          });
        })
      )
        .then((results) => {
          return results.reduce((all, x) => all.concat(...x), []);
        })
        .then(resolve)
        .catch(reject);
    });
  });
}

function findLinksFiles(mdFilesList) {
  const findLinksFilesPromise = new Promise(function (resolve, reject) {
    const linksArray = mdFilesList.map((file) => {
      return findLinks(file).then((linkObject) => linkObject);
    });
    if (linksArray) {
      const res = Promise.allSettled(linksArray).then((links) =>
        links.flatMap((linkArray) => {
          const linkObjects = [];
          linkArray?.value?.forEach((link) => linkObjects.push(link));
          return linkObjects;
        })
      );
      resolve(res);
    }
  });
  return findLinksFilesPromise;
}

/* Leer archivos */
function findLinks(file, isFile = false) {
  const findLinksPromise = new Promise(function (resolve, reject) {
    const pathResolve = isFile ? path.resolve(file[0]) : file;
    fs.readFile(pathResolve, "utf8", (e, data) => {
      const links = data?.match(reExp);
      if (links) {
        const response = links.map((link) => {
          const linkArray = link.split("]");
          const linkName = linkArray[0].substring(1);
          const linkUrl = linkArray[1].substring(1, linkArray[1].length - 1);
          const linkR = pathResolve.replace("\\\\", "\\");
          const linkObject = {
            name: linkName,
            url: linkUrl,
            linkRoute: linkR,
          };
          return linkObject;
        });
        resolve(response);
      } else {
        reject("no hay links");
      }
    });
  });
  return findLinksPromise;
}

/* funcion validar link */
function getValidate(links) {
  const getValidatePromise = new Promise(function (resolve, reject) {
    const res = links.map((link) => {
      return axios
        .get(link.url)
        .then(function (response) {
          return {
            ...link,
            valid: {
              responseCode: response.status,
              statusText: response.statusText,
            },
          };
        })
        .catch(function (error) {
          return {
            ...link,
            valid: {
              responseCode: error.code,
              statusText: "Failed",
            },
          };
        });
    });
    if (res) {
      const linksObjects = Promise.allSettled(res).then((links) =>
        links.map((link) => {
          return {
            name: link.value.name,
            url: link.value.url,
            linkRoute: link.value.linkRoute,
            valid: { ...link.value.valid },
          };
        })
      );
      resolve(linksObjects);
    }
  });
  return getValidatePromise;
}

function mdlinks(route, validateUrl) {
  const mdLinksPromise = new Promise(function (resolve, reject) {
    isRouteValid(route)
      .then((isValid) => {
        if (isValid) {
          isDirectoryOrFile(route).then((directoryOrFile) => {
            if (directoryOrFile === "directory") {
              isThereAnyMarkDown(route).then((isThereMarkdown) => {
                findLinksFiles(isThereMarkdown)
                  .then((linkObject) => {
                    if (!validateUrl) {
                      resolve(linkObject);
                    }
                    getValidate(linkObject).then((linkArray) =>
                      resolve(linkArray)
                    );
                  })
                  .catch(reject);
              });
            } else {
              markDownFile(route)
                .then((isThereMarkdown) => {
                  findLinks(mdFiles, true)
                    .then((linkObject) => {
                      if (!validateUrl) {
                        resolve(linkObject);
                      }
                      getValidate(linkObject).then((linkArray) =>
                        resolve(linkArray)
                      );
                    })
                    .catch((e) => console.log("No hay links"));
                })
                .catch((e) => console.log("No es un .md"));
            }
          });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return mdLinksPromise.then((response) => {
    /* console.log(response); */ //descomentaaaaar
    return response;
  });
}

/*Cantidad de links*/
const totalLinks = (linksArray, showValidations) => {
  const stats = linksArray.reduce(
    (count, current) => {
      const isRepeated = count.unique.includes(current.url);
      if (isRepeated) {
        count.repeated.push(current.url);
      } else {
        count.unique.push(current.url);
        if (showValidations && current.valid.responseCode !== 200) {
          count.invalid.push(current.url);
        }
      }
      return count;
    },
    { unique: [], repeated: [], invalid: [] }
  );

  const response = {
    total: stats.unique.length + stats.repeated.length,
    unique: stats.unique.length,
    ...(showValidations && { broken: stats.invalid.length }),
  };
  return response;
};

module.exports = {
  mdlinks,
  isRouteValid,
  isDirectoryOrFile,
  markDownFile,
  isThereAnyMarkDown,
  findLinksFiles,
  findLinks,
  getValidate,
  totalLinks,
};
