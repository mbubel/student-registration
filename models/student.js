module.exports = function(sequelize, DataTypes) {
    var Student = sequelize.define("Student", {
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
        len: [1]
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      studio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        len: [1]
      }
    });
  
    // Student associated with studio
  
    return Student;
  };