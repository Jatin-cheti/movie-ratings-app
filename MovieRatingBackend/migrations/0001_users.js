module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Users', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        username: { type: Sequelize.STRING, allowNull: false, unique: true },
        email: { type: Sequelize.STRING, allowNull: false, unique: true },
        password: { type: Sequelize.STRING, allowNull: false },
        role: { type: Sequelize.ENUM('user', 'admin'), defaultValue: 'user' },
        createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('Users');
    }
  };
  