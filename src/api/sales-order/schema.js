const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
  internalObservation: String,
  date: Date,
  saler: String,
  paymentValue: Number,
  customer: Object,
  itens: Array,
  pipedriveDealId: String,
  pipedriveResponseId: {
    type: Schema.Types.ObjectId,
    ref: "PipedriveResponse",
  },
  blingResponseId: {
    type: Schema.Types.ObjectId,
    ref: "BlingResponse",
  },
});
