module.exports = (sequelize, DataTypes) => {
    const Movies = sequelize.define('Movies', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      rating: { type: DataTypes.FLOAT, defaultValue: 0 },
      imageUrl: { type: DataTypes.STRING, allowNull: true } 
    });
    return Movies;
  };
  