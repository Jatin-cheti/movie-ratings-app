const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router.post("/:movieId", verifyToken, reviewController.addReview);
router.put("/:reviewId", verifyToken, reviewController.editReview);
router.delete("/:reviewId", verifyToken, reviewController.deleteReview);
router.post("/:reviewId/like", verifyToken, reviewController.likeReview);

module.exports = router;
