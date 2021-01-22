module.exports = function(sequelize, DataTypes) {
  const AvailableClasses = sequelize.define("AvailableClasses", {
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
    }
  });

  // Create association between available classes model and studio model
  // We're saying that an available class should belong to a studio
  // A class can't be created without an studio due to the foreign key constraint
  AvailableClasses.associate = function(models) {
    AvailableClasses.belongsTo(models.Studio, {
      foreignKey: "studio_id"
    });
    AvailableClasses.hasMany(models.Student, {
      foreignKey: "class_id"
    });
  };

  return AvailableClasses;
};
