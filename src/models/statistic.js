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
      allowNull: false,
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

  const formatMonthYear = (month, year) => {
    return [month, year].join('-');
  };

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

  Statistic.hook('beforeValidate', (model, options) => {
    if (model.isNewRecord) {
      model.month_year = formatMonthYear(model.month, model.year);
    }
  });

  Statistic.findByMonthYear = function(month, year, centerId) {
    if (!month || !year) {
      throw new Error('Both month and year should be present');
    }
    let monthYear = formatMonthYear(month, year);
    let model = Statistic.findOne({
      where: {month_year: monthYear, center_id: centerId},
    });
    return model;
  };

  Statistic.prototype.formatData = function() {
    return {
      month: this.month,
      year: this.year,
      stats: {
        number_of_new_students: this.number_of_new_students,
        number_of_new_scholarships: this.number_of_new_scholarships,
        number_of_excellent_students: this.number_of_excellent_students,
      },
      center_id: this.center_id,
    };
  };

  return Statistic;
};
