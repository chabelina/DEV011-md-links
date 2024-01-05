#!/usr/bin/env node

const { mdLinks } = require("../index");

const path = process.argv[2];
const validate = process.argv.includes("--validate");
const stats = process.argv.includes("--stats");

mdLinks(path, validate, stats)
  .then((res) => {
    console.log("ANALYSIS RESULTS: ", res);
  })
  .catch((error) => {
    console.log("FATAL ERROR: ", error);
  });
