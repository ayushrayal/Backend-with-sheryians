const express = require("express");
const {getSongController} = require("../controllers/Song.controller");
const {identifier} = require("../middleware/Auth.middleware");
const { model } = require("mongoose");
const SongRouther = express.Router()
// GET /api/recommendations?mood=happy
SongRouther.get('/spotify/callback',getSongController);
module.exports = {SongRouther}