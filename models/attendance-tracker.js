module.exports = function(sequelize, DataTypes) {
    var AttendanceTracker = sequelize.define("AttendanceTracker", {
      attendance_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      date: {
        type: DataTypes.DATE,
        allowNull: false
      },

    });
  
    //Available classes associated with student and studio and available classes
    
    return AttendanceTracker;
  };