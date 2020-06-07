const mongoose = require("mongoose");
const { readdirSync, statSync } = require("fs");
const { join } = require("path");
const models = {};

mongoose.connect("mongodb://pipedrivetobling-mongodb:27017/pipedrivetobling", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dirs = (p) =>
  readdirSync(p).filter((f) => statSync(join(p, f)).isDirectory());

dirs(`${__dirname}/../api`).forEach((dir) => {
  readdirSync(`${__dirname}/../api/${dir}`)
    .filter((file) => file === "model.js")
    .forEach((file) => {
      const modelPath = join(`${__dirname}/../api/${dir}`, file);
      const Model = require(modelPath);
      const model = new Model();

      models[model.constructor.modelName] = Model;
    });
});

module.exports = models;