const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let comercioSchema = new Schema({
  modo: {
    type: String,
    required: [true, "El modo es necesario"]
  },
  pais: {
    type: String,
    required: [true, "El país es necesario"]
  },
  currency: {
    type: String,
    required: [true, "El currency es necesario"]
  },
  merchantId: {
    type: Number,
    required: [true, "merchantId es necesario"]
  },
  accountIdPayu: {
    type: Number,
    required: [true, "accountIdPayu es necesario"]
  },
  apiKeyPayu: {
    type: String,
      required: [true, 'apiKeyPayu es necesario']
  }
});

module.exports = mongoose.model("Comercio", comercioSchema);
