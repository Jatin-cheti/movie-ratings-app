const { Movies, Reviews } = require("../models");

exports.addMovie = async (req, res) => {
  try {
    const { title, description, rating } = req.body;
    let imageUrl = null;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; 
    }

    const movie = await Movies.create({ title, description, rating, imageUrl });

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error adding movie", error });
  }
};

exports.editMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, rating } = req.body;
    const movie = await Movies.findByPk(id);

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    if (req.file) {
      movie.imageUrl = `/uploads/${req.file.filename}`;
    }

    movie.title = title;
    movie.description = description;
    movie.rating = rating;
    await movie.save();

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error });
  }
};
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movies.findByPk(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    await movie.destroy();
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Reviews.findByPk(id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    await review.destroy();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};
