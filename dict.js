"use strict";

const fs = require("fs");
const path = require("path");
const CsvReader = require("promised-csv");
const reader = new CsvReader();
const yaml = require("js-yaml");
const csvDir = path.join(__dirname, "csv");
const dictDir = path.join(__dirname, "dict");

const message = "ひらがなで表記したほうが読みやすい代名詞";

function readdirPromise(dir) {
  return new Promise(function(resolve, reject) {
    fs.readdir(dir, function(err, files) {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
}

function createEntry(file) {
  return reader.read(file, function(data) {
    const entry = {
      expected: data[4],
      extensions: {},
      tokens: []
    };

    entry.tokens[0] = {
      surface_form: data[5],
      pos: data[9],
      pos_detail_1: data[10],
      pos_detail_2: data[11],
      pos_detail_3: data[12],
      conjugated_type: data[13],
      conjugated_form: data[14],
      basic_form: data[15],
      reading: data[16],
      pronunciation: data[17]
    };

    return entry;
  });
}

readdirPromise(csvDir)
  .then(function(files) {
    Promise.all(files.map(function(file) {
      const filePath = path.join(csvDir, file);
      return createEntry(filePath);
    })).then(function(results) {

      const dictData = {
        message: message,
        dict: []
      };

      results.forEach(function(result) {
        if (result.length > 0) {
          dictData.dict = dictData.dict.concat(result);
        }
      });
      fs.writeFileSync(path.join(dictDir, "daimeishi.yml"), yaml.safeDump(dictData));

    });
  });