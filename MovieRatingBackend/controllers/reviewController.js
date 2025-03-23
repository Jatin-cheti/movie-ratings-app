const { Reviews, Users, Likes } = require("../models");

exports.addReview = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { content, rating } = req.body;
    const userId = req.user.id;

    const review = await Reviews.create({ userId, movieId, content, rating });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
};

exports.editReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { content, rating } = req.body;
    const userId = req.user.id;

    const review = await Reviews.findOne({ where: { id: reviewId, userId } });
    if (!review) return res.status(403).json({ message: "Unauthorized or review not found" });

    review.content = content;
    review.rating = rating;
    await review.save();

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Reviews.findOne({ where: { id: reviewId, userId } });
    if (!review) return res.status(403).json({ message: "Unauthorized or review not found" });

    await review.destroy();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};

exports.likeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const existingLike = await Likes.findOne({ where: { userId, reviewId } });

    if (existingLike) {
      await existingLike.destroy();
      res.json({ message: "Review unliked" });
    } else {
      await Likes.create({ userId, reviewId });
      res.json({ message: "Review liked" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error liking/unliking review", error });
  }
};

exports.sortReviews = async (req, res) => {
    try {
      const { movieId } = req.params;
      const { sort, page = 1, limit = 5 } = req.query;
  
      let order = [["createdAt", "DESC"]];
      if (sort === "popular") order = [["likes", "DESC"]];
  
      const offset = (page - 1) * limit;
  
      const reviews = await Reviews.findAll({ 
        where: { movieId }, 
        order, 
        limit: parseInt(limit), 
        offset: parseInt(offset)
      });
  
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Error sorting reviews", error });
    }
  };
  
