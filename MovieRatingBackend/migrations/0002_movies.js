module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Movies', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.TEXT, allowNull: false },
        imageUrl: { type: Sequelize.STRING, allowNull: true },
        rating: { type: Sequelize.FLOAT, defaultValue: 0 },
        createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('Movies');
    }
  };
  