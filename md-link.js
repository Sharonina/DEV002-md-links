#!/usr/bin/env node
const { mdlinks, totalLinks } = require("./src/cli");

const route = process.argv[2];
const showStats = process.argv.find((arg) => arg === "--stats");
const showValidations = process.argv.find((arg) => arg === "--validate");
mdlinks(route, showValidations).then((listArray) => {
  if (showStats) {
    console.log(totalLinks(listArray, showValidations));
  }
});
