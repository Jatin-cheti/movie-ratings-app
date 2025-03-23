module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define('Reviews', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      movieId: { type: DataTypes.INTEGER, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      rating: { type: DataTypes.FLOAT, allowNull: false },
      likes: { type: DataTypes.INTEGER, defaultValue: 0 }
    });
    return Reviews;
  };
  