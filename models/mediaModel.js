const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: { type: String, required: true, enum: ["dangerous", "safe"], default: "safe" },
});

module.exports = mongoose.model("Media", mediaSchema);
