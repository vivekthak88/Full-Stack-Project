'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bathbombs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      style: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.BLOB
      },
      description: {
        type: Sequelize.TEXT
      },
      ingredients: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      cost: {
        type: Sequelize.NUMERIC
      },
      pinterest: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bathbombs');
  }
};