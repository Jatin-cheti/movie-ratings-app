const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/all-movies", movieController.getMovies);
router.get("/movieById", movieController.getMovieById);

module.exports = router;
