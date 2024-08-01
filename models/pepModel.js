const mongoose = require("mongoose");

const pepSchema = new mongoose.Schema({
  fin: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pep", pepSchema);
