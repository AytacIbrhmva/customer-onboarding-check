const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  fin: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  nationality: { type: String, required: true },
  currentAddress: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  jobTitle: { type: String, required: true },
  industrySector: { type: String, required: true },
  photo: { type: String, required: true },
  status: { type: String, required: true, enum: ["negative", "non-negative"], default: "non-negative" },
});

module.exports = mongoose.model("Customer", customerSchema);
