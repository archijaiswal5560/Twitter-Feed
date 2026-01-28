"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("displayed_tweets", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      tweet_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      tweet_url: {
        type: Sequelize.STRING
      },
      displayed_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("displayed_tweets");
  }
};
