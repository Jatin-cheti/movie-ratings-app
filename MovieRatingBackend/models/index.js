'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("CONFIG:", require(__dirname + "/../config/config.json"));
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const { Sequelize, DataTypes } = require('sequelize');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
      sequelize.authenticate()
      .then(() => {
          console.log('connected..')
      })
      .catch(err => {
          console.log('Error'+err)
      })
      db.Sequelize = Sequelize
      db.sequelize = sequelize

      
      const User = require('./users')(sequelize, DataTypes);
      const Movie = require('./movies')(sequelize, DataTypes);
      const Review = require('./reviews')(sequelize, DataTypes);
      const Like = require('./likes')(sequelize, DataTypes);
      
      User.hasMany(Review, { foreignKey: 'userId' });

Movie.hasMany(Review, { foreignKey: 'movieId', as: "reviews" }); 
Review.belongsTo(Movie, { foreignKey: 'movieId', as: "movie" });
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Like, { foreignKey: 'userId' });
Review.hasMany(Like, { foreignKey: 'reviewId' });
Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Review, { foreignKey: 'reviewId' });
      // db.sequelize.sync({ alter: true })
      // .then(() => console.log('Database synced'))
      // .catch(err => console.log('Sync error:', err));
      db.User = User;
db.Movie = Movie;
db.Review = Review;
db.Like = Like;
      module.exports= db
      