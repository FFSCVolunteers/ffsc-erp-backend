module.exports = function(sequelize, DataTypes) {
  const UserRole = sequelize.define('UserRole', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    center_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    timestamp: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'user_role',
    classMethods: {
      associate: function(models) {
        UserRole.belongsTo(models.User, {
          foreignKey: 'user_id',
          onDelete: 'RESTRICT',
        });
        UserRole.belongsTo(models.Role, {
          foreignKey: 'role_id',
          onDelete: 'RESTRICT',
        });
      },
    },
  });
  return UserRole;
};
