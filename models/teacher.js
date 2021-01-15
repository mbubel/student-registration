module.exports = function(sequelize, DataTypes) {
    var Teacher = sequelize.define("Teacher", {
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      home_studio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [1]
        }
      }
    });
  
    //Teacher associated with studio
    
    return Teacher;
  };