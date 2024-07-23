const express = require("express");
const { getMedias, createMedia, updateMedia, deleteMedia, getOneMedia } = require("../controllers/mediaController");
const router = express.Router();

router.route("/").get(getMedias).post(createMedia);
router.route("/:id").put(updateMedia).delete(deleteMedia).get(getOneMedia);

module.exports = router;
