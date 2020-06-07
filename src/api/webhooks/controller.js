const mongoose = require('mongoose');
// const PipedriveRes = mongoose.model('PipedriveRes');
const { PipedriveResponse } = require('../../config/models');

exports.updated = (req, res) => {
    PipedriveResponse.create(req.body, function (err, created) {
        res.status(201).json(created);
      });
};

exports.test = (req, res) => {
    PipedriveResponse.find({}, function (err, docs) {
        if (err) {
            res.sendStatus(500);
            console.log(err);
        } else res.status(200).json(docs);
    });
};