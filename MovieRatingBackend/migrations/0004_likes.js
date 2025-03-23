module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Likes', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
        reviewId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Reviews', key: 'id' }, onDelete: 'CASCADE' },
        createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('Likes');
    }
  };
  