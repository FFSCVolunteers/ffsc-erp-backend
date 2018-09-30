module.exports = function(sequelize, DataTypes) {
  const Statistic = sequelize.define('Statistic', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    year: {
      type: DataTypes.SMALLINT(5),
      allowNull: false,
    },
    month: {
      type: DataTypes.TINYINT(2),
      allowNull: false,
    },
    month_year: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    center_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    number_of_new_students: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    number_of_new_scholarships: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    number_of_excellent_students: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    inputted_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  }, {
    timestamp: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'statistic',
  });
  Statistic.associate = function(models) {
    Statistic.belongsTo(models.Center, {
      foreignKey: 'center_id',
      onDelete: 'RESTRICT',
    });
    Statistic.belongsTo(models.User, {
      foreignKey: 'inputted_by',
      onDelete: 'RESTRICT',
    });
  };
  return Statistic;
};
