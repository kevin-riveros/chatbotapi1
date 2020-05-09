'use strict';
module.exports = (sequelize, DataTypes) => {
  const CourseClassroom = sequelize.define('CourseClassroom', {
    idCourse: DataTypes.INTEGER,
    idTeacher: DataTypes.INTEGER,
    idClassroom: DataTypes.INTEGER
  }, {});
  CourseClassroom.associate = function(models) {
    // associations can be defined here
  };
  return CourseClassroom;
};