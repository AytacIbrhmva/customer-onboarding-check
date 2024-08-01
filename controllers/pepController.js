const asyncHandler = require("express-async-handler");
const Pep = require("../models/pepModel");

//@ Get all peps
const getPeps = asyncHandler(async (req, res) => {
  
  const peps = await Pep.find();
  res.status(200).json(peps);
});

//@ Create pep
const createPep = asyncHandler(async (req, res) => {
  const { photo, content, status } = req.body;

  if (!photo || !content) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const pep = await Pep.create({
    photo,
    content,
    status,
  });
  res.status(201).json(pep);
});

//@ Delete pep
const deletePep = asyncHandler(async (req, res) => {
  const pep = await Pep.findById(req.params.id);
  if (!pep) {
    res.status(404);
    throw new Error("Pep not found");
  }
  await Pep.deleteOne({ _id: req.params.id });
  res.status(200).json(pep);
});


module.exports = { getPeps, createPep, deletePep };
