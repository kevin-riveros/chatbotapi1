'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentCourse = sequelize.define('StudentCourse', {
    idCourse: DataTypes.INTEGER,
    idStudent: DataTypes.INTEGER
  }, {});
  StudentCourse.associate = function(models) {
    // associations can be defined here
    StudentCourse.belongsTo(models.Course, { foreignKey: 'idCourse' })
    StudentCourse.hasMany(models.Grade, { foreignKey: 'idStudentCourse' });
  };
  return StudentCourse;
};