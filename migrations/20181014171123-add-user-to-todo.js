'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING
      },
    }).then(function() {
      queryInterface.addColumn(
        'Todos', 'userId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Users', key: 'id' }
        }
      );
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos', 'userId').then(function () {
      return queryInterface.dropTable('Users');
    });
  }
};
