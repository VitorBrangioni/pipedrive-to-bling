const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Pipedrive = new Schema({
  title: String,
});

const PipedriveModel = mongoose.model('Pipedrive', Pipedrive);

module.exports = PipedriveModel;