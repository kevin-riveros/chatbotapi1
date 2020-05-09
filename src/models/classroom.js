'use strict';
module.exports = (sequelize, DataTypes) => {
  const Classroom = sequelize.define('Classroom', {
    name: DataTypes.STRING,
    idTeacher: DataTypes.INTEGER
  }, {});
  Classroom.associate = function(models) {
    // associations can be defined here
  };
  return Classroom;
};