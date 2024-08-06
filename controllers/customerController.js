const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");
const Pep = require("../models/pepModel");

//@ Get all customers
const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find();
  res.status(200).json(customers);
});

//@ Create customer
const createCustomer = asyncHandler(async (req, res) => {
  const { firstName, lastName, gender, dateOfBirth, nationality, currentAddress, email, phoneNumber, jobTitle, industrySector, photo, fin } = req.body;
  if (
    !firstName ||
    !lastName ||
    !gender ||
    !dateOfBirth ||
    !nationality ||
    !currentAddress ||
    !email ||
    !phoneNumber ||
    !jobTitle ||
    !industrySector ||
    !photo ||
    !fin
  ) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const isPep = await Pep.findOne({ fin });
  const status = isPep ? "dangerous" : "safe";

  const customer = await Customer.create({
    firstName,
    lastName,
    gender,
    dateOfBirth,
    nationality,
    currentAddress,
    email,
    phoneNumber,
    jobTitle,
    industrySector,
    photo,
    status,
    fin,
  });
  res.status(201).json(customer);
});

//@ Update customer
const updateCustomer = asyncHandler(async (req, res) => {
  const { fin } = req.body;
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }

  if (fin !== customer.fin) {
    const isPep = await Pep.findOne({ fin });
    req.body.status = isPep ? "dangerous" : "safe";
  } 
  
  const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedCustomer);
});

//@ Delete customer
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }
  await Customer.deleteOne({ _id: req.params.id });
  res.status(200).json(customer);
});

//@ Get one customer
const getOneCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }
  res.status(200).json(customer);
});

module.exports = { getCustomers, createCustomer, updateCustomer, deleteCustomer, getOneCustomer };
