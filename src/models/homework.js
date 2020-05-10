'use strict';
module.exports = (sequelize, DataTypes) => {
  const Homework = sequelize.define('Homework', {
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    task: DataTypes.TEXT,
    image: DataTypes.STRING,
    alert: DataTypes.TEXT,
    title: DataTypes.STRING,
    idCourse: DataTypes.INTEGER
  }, {});
  Homework.associate = function(models) {
    // associations can be defined here
    Homework.belongsTo(models.Course,{ foreignKey: 'idCourse' });
  };
  return Homework;
};