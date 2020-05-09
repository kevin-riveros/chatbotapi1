'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define('Meeting', {
    meeting_date: DataTypes.DATE,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    reason: DataTypes.STRING,
    idTeacher: DataTypes.INTEGER,
    idStudent: DataTypes.INTEGER,
  }, {});
  Meeting.associate = function(models) {
    // associations can be defined here
  };
  return Meeting;
};