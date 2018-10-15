'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true }
  },{
    indexes: [
      { unique: true, fields: ['userId'] }
    ]
  });
  User.associate = function(models) {
    User.hasMany(models.Todo, { foreignKey: 'userId', sourceKey: 'id' });
  };
  return User;
};
