module.exports = function(sequelize, DataTypes) {
    var AvailableClasses = sequelize.define("AvailableClasses", {
      day_of_week: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      start_time: {
        type: DataTypes.STRING,
        allowNull: false
      },

      end_time: {
        type: DataTypes.STRING,
        allowNull: false
      },

      teacher: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
          }
      },

      studio: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
          }
      }
    });
  
    //Available classes associated with student and studio
    
    return AvailableClasses;
  };