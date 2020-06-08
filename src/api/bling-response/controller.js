const mongoose = require("mongoose");
const { PipedriveResponse: BlingResponse } = require("../../config/models");

exports.findAll = (req, res) => {
  BlingResponse.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
