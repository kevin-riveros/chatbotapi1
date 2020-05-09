'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Classrooms',
      'idStudentCourse',
      Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Classrooms',
      'idStudentCourse',
      Sequelize.INTEGER
    );
  }
};
