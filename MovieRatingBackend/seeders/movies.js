'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('movies', [
      {
        title: 'Fast and Furious 7',
        description: 'Action/Thriller',
        imageUrl: '/uploads/fast7.jpg',
        rating: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Inception',
        description: 'Sci-Fi/Thriller',
        imageUrl: '/uploads/inception.jpg',
        rating: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Dark Knight',
        description: 'Action/Crime',
        imageUrl: '/uploads/darkknight.jpeg',
        rating: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Interstellar',
        description: 'Sci-Fi/Drama',
        imageUrl: '/uploads/interstellar.jpg',
        rating: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Titanic',
        description: 'Romance/Drama',
        imageUrl: '/uploads/titanic.jpg',
        rating: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Matrix',
        description: 'Sci-Fi/Action',
        imageUrl: '/uploads/matrix.jpg',
        rating: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Avengers: Endgame',
        description: 'Action/Superhero',
        imageUrl: '/uploads/endgame.jpg',
        rating: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Joker',
        description: 'Crime/Drama',
        imageUrl: '/uploads/joker.jpeg',
        rating: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Gladiator',
        description: 'Action/Drama',
        imageUrl: '/uploads/gladiator.jpg',
        rating: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Wolf of Wall Street',
        description: 'Comedy/Drama',
        imageUrl: '/uploads/wolf.jpg',
        rating: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Godfather',
        description: 'Crime/Drama',
        imageUrl: '/uploads/godfather.jpg',
        rating: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Shawshank Redemption',
        description: 'Drama',
        imageUrl: '/uploads/shawshank.jpg',
        rating: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Forrest Gump',
        description: 'Drama/Romance',
        imageUrl: '/uploads/forrest.jpg',
        rating: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Lion King',
        description: 'Animation/Adventure',
        imageUrl: '/uploads/lionking.jpg',
        rating: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Deadpool',
        description: 'Action/Comedy',
        imageUrl: '/uploads/deadpool.jpg',
        rating: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('movies', null, {});
  }
};
