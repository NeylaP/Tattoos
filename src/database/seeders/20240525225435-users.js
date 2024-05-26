"use strict";
const bcrypt = require("bcrypt");
const plainPassword = "12345678";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *    */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          first_name: "Neyla",
          last_name: "Peña",
          email: "admin@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          is_active: true,
          role_id: 1
        },
        {
          id: 2,
          first_name: "Rosa",
          last_name: "Moncada",
          email: "rmoncada@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          is_active: true,
          role_id: 2
        },
        {
          id: 3,
          first_name: "Natalia",
          last_name: "Pinzón",
          email: "npinzon@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          is_active: true,
          role_id: 3
        },
        {
          id: 4,
          first_name: "Jhonatan",
          last_name: "Gonzalez",
          email: "jhonatang@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          is_active: true,
          role_id: 3
        },
        {
          id: 5,
          first_name: "David",
          last_name: "Fernandez",
          email: "dfernandez@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          is_active: true,
          role_id: 3
        },
        {
          id: 6,
          first_name: "Joel",
          last_name: "Rodriguez",
          email: "jrodriguez@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          is_active: true,
          role_id: 3
        },
        {
          id: 7,
          first_name: "Gabriela",
          last_name: "Castro",
          email: "gcastro@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          is_active: true,
          role_id: 3
        },
        {
          id: 8,
          first_name: "Kelly",
          last_name: "Martelo",
          email: "kmartelo@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          is_active: true,
          role_id: 3
        },
        {
          id: 9,
          first_name: "Yoelis",
          last_name: "Payares",
          email: "ypayares@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          is_active: true,
          role_id: 3
        },
        {
          id: 10,
          first_name: "Batriz",
          last_name: "Ferreira",
          email: "bferreira@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          is_active: true,
          role_id: 3
        },
      ],
      {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     **/
    await queryInterface.bulkDelete('users', null, {});

  }
};
