const { Movie, Review, User, Like, Sequelize } = require("../models");

exports.getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;

    const movies = await Movie.findAll({
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']],
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movieId = req.query.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const movie = await Movie.findByPk(movieId, {
      include: [
        {
          model: Review,
          as: "reviews",
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
          attributes: {
            include: [
              [
                // Count the number of likes for each review
                Sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE Likes.reviewId = reviews.id)`),
                "likesCount",
              ],
            ],
          },
          order: [["createdAt", "DESC"]],
          limit: limit,
          offset: offset,
        },
      ],
    });

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const totalReviews = await Review.count({ where: { movieId } });

    res.json({
      movie,
      totalReviews,
      totalPages: Math.ceil(totalReviews / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Sequelize Error:", error);
    res.status(500).json({ message: "Error fetching movie details", error });
  }
};


