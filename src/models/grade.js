'use strict';
module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define('Grade', {
    mark: DataTypes.INTEGER,
    idStudentCourse: DataTypes.INTEGER
  }, {});
  Grade.associate = function(models) {
    // associations can be defined here
    Grade.belongsTo(models.StudentCourse,{ foreignKey: 'idStudentCourse' });
  };
  return Grade;
};