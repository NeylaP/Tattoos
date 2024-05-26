'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     **/
      await queryInterface.bulkInsert('appointments', [
        {
        appointment_date: '2024-06-10',
        user_id: 4,
        service_id: 2
      },
        {
        appointment_date: '2024-06-10',
        user_id: 7,
        service_id: 3
      },
        {
        appointment_date: '2024-06-10',
        user_id: 9,
        service_id: 1
      },
        {
        appointment_date: '2024-06-11',
        user_id: 8,
        service_id: 4
      },
        {
        appointment_date: '2024-06-11',
        user_id: 6,
        service_id: 2
      },
        {
        appointment_date: '2024-06-11',
        user_id: 10,
        service_id: 3
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     **/
      await queryInterface.bulkDelete('appointments', null, {});
  }
};
