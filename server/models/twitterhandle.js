"use strict";

module.exports = (sequelize, DataTypes) => {
  const TwitterHandle = sequelize.define(
    "TwitterHandle",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      handle: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: "twitter_handles",
      timestamps: true
    }
  );

  return TwitterHandle;
};
