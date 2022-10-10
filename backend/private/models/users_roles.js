const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'users_roles',
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'users_roles',
      timestamps: false,
      indexes: [
        {
          name: 'user_roles_relation',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'roleId' }, { name: 'userId' }],
        },
        {
          name: 'user_roles_ibfk_2',
          using: 'BTREE',
          fields: [{ name: 'userId' }],
        },
      ],
    }
  )
}
