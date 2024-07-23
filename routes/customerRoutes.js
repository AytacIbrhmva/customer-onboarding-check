const express = require("express");
const { getCustomers, createCustomer, updateCustomer, deleteCustomer, getOneCustomer } = require("../controllers/customerController");
const router = express.Router();

router.route("/").get(getCustomers).post(createCustomer);
router.route("/:id").put(updateCustomer).delete(deleteCustomer).get(getOneCustomer);

module.exports = router;
