module.exports = function(sequelize, DataTypes) {
  const Studio = sequelize.define(
    "Studio",
    {
      studio_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
          isEmail: true
        }
      }
    },
    {
      timestamps: false
    }
  );
  return Studio;
};
