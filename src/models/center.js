module.exports = function(sequelize, DataTypes) {
  const Center = sequelize.define('Center', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamp: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'center',
  });
  return Center;
};
