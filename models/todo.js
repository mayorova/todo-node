'use strict';

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    done: { type: DataTypes.BOOLEAN, defaultValue: false },
    userId: DataTypes.INTEGER
  },{});
  Todo.associate = function(models) {
    Todo.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Todo;
};
