'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    attendance_date: DataTypes.DATE,
    attended: DataTypes.BOOLEAN,
    idStudent: DataTypes.INTEGER
  }, {});
  Attendance.associate = function(models) {
    // associations can be defined here
  };
  return Attendance;
};