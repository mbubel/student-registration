module.exports = function(sequelize, DataTypes) {
  const Student = sequelize.define("Student", {
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

    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    student_status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  // Create association between student model and studio model
  // We're saying that a Student should belong to a Studio
  // A Student can't be created without an Studio due to the foreign key constraint
  Student.associate = function(models) {
    Student.belongsTo(models.Studio, {
      foreignKey: "studio_id"
    });
  };

  return Student;
};
