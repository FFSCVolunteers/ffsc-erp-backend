'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('statistic', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      year: {
        allowNull: false,
        type: Sequelize.SMALLINT(5),
      },
      month: {
        allowNull: false,
        type: Sequelize.TINYINT(2),
      },
      month_year: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      center_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: 'center',
          key: 'id',
        },
      },
      number_of_new_students: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      number_of_new_scholarships: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      number_of_excellent_students: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      inputted_by: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }).then(() => {
      queryInterface.addIndex('statistic', {
        fields: ['month_year'],
      });
    });
  },

  down: (queryInterface, Sequelize) => {
  },
};
