# MD-Links

## Index

* [1. Project Abstract](#1-project-abstract)
* [2. Installation Guide](#3-installation-guide)
* [3. Using MD-Links](#4-using-md-links)

***

## 1. Project Abstract
`MD-Links` is a library developed in Node.js that serves as a helpful tool for analyzing links within Markdown files.

MD-Links offers many useful features, such as: 
- `URL validation` through Axios powered HTTP requests.
- An efficient aproach to `file-system navigation` thanks to it's implemented functions.
- A command line interface (CLI) for quick access to the library's  service from the terminal.

## 2. Installation Guide
This project offers two ways of integration: 

-An installable module from GitHub, or - A NPM package, providing the flexibility to be installed from the terminal.

To install the library with NPM:

- Run the following command in terminal:

`npm i md-links-chabelina`

## 3. Using MD-Links

Once you the library is correctly installed you'll have access to the library's general command in terminal. It's syntax is as follows:

`mdlinks (file path) (options)`

- `file path` : Relative or absolute path leading to the target <ins>**.md**</ins> file.
- `options` recieves two possible options:
  - `--validate`: Will return an array of objects with two extra properties displaying the link's HTTP request validation data ('status' and 'ok').
  - `--stats`: Will return an object that'll display general statistics on the analysis results ('totalLinks', 'uniqueLinks' and 'failedLinks').


