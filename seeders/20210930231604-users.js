'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      name: "John Doe",
      username: "jdoe@hotmail.com",
      password: "password123",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
    name: "Jane Doe",
    username: "janedoe@hotmail.com",
    password: "password1234",
    createdAt: new Date(),
    updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
