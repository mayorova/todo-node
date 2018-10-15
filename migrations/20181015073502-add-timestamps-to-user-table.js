'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'createdAt',
      {
        type: Sequelize.DATE,
        allowNull: false,
      }
    ).then(function () {
      return queryInterface.addColumn('Users', 'updatedAt',
        {
          type: Sequelize.DATE,
          allowNull: false,
        }
      )
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'createdAt').then(function() {
      return queryInterface.removeColumn('Users', 'updatedAt')
    })
  }
};
