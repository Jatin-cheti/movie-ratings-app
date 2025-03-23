module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define('Likes', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      reviewId: { type: DataTypes.INTEGER, allowNull: false }
    });
    return Likes;
  };
  