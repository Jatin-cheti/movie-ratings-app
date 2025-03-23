module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Reviews', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' }, onDelete: 'CASCADE' },
        movieId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Movies', key: 'id' }, onDelete: 'CASCADE' },
        content: { type: Sequelize.TEXT, allowNull: false },
        rating: { type: Sequelize.FLOAT, allowNull: false },
        likes: { type: Sequelize.INTEGER, defaultValue: 0 },
        createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('Reviews');
    }
  };
  