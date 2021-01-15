module.exports = function(sequelize, DataTypes) {
    var Studio = sequelize.define("Studio", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email_address: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      }
    });
   
    return Studio;
  };