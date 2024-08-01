const express = require("express");
const { getPeps, createPep, deletePep } = require("../controllers/pepController");
const router = express.Router();

router.route("/").get(getPeps).post(createPep);
router.route("/:id").delete(deletePep)

module.exports = router;
