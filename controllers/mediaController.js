const asyncHandler = require("express-async-handler");
const Media = require("../models/mediaModel");
const { checkMediaStatus } = require("../services/apiService");

//@ Get all medias
const getMedias = asyncHandler(async (req, res) => {
  const medias = await Media.find();
  res.status(200).json(medias);
});

//@ Create media
const createMedia = asyncHandler(async (req, res) => {
  const { photo, content } = req.body;

  if (!photo || !content) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const status = await checkMediaStatus(content);

  const media = await Media.create({
    photo,
    content,
    status,
  });
  res.status(201).json(media);
});

//@ Update media
const updateMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (!media) {
    res.status(404);
    throw new Error("Media not found");
  }

  const updatedData = { ...media.toObject(), ...req.body };

  const updatedMedia = await Media.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
  });
  res.status(200).json(updatedMedia);
});

//@ Delete media
const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (!media) {
    res.status(404);
    throw new Error("Media not found");
  }
  await Media.deleteOne({ _id: req.params.id });
  res.status(200).json(media);
});

//@ Get one media
const getOneMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (!media) {
    res.status(404);
    throw new Error("Media not found");
  }
  res.status(200).json(media);
});

module.exports = { getMedias, createMedia, updateMedia, deleteMedia, getOneMedia };
