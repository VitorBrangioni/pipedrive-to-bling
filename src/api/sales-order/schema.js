const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
  internalObservation: String,
  date: String,
  saler: String,
  paymentInstallments: Object,
  customer: Object,
  itens: Object,
  pipedriveResponseId: {
    type: Schema.Types.ObjectId,
    ref: "PipedriveResponse",
  },
   blingResponseId: {
    type: Schema.Types.ObjectId,
    ref: "BlingResponse",
  },
});
