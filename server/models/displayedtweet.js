"use strict";

module.exports = (sequelize, DataTypes) => {
  const DisplayedTweet = sequelize.define(
    "DisplayedTweet",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      tweet_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      tweet_url: {
        type: DataTypes.STRING
      },
      displayed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: "displayed_tweets",
      timestamps: false
    }
  );

  return DisplayedTweet;
};
