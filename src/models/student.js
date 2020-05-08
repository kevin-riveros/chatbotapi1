'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    dni: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.STRING,
    birthday: DataTypes.DATE
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
  };
  return Student;
};