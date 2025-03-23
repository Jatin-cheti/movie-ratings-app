const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const movieRoutes = require("./movieRoutes");
const reviewRoutes = require("./reviewRoutes");
const adminRoutes = require("./adminRoutes");

router.use("/auth", authRoutes);
router.use("/movies", movieRoutes);
router.use("/reviews", reviewRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
