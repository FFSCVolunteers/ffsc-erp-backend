module.exports = function(sequelize, DataTypes) {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamp: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'role',
  });
  return Role;
};
