const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Item = sequelize.define("element", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  imageLink: Sequelize.STRING,
  isFolder: { type: Sequelize.INTEGER, allowNull: false },
  isDeleted: Sequelize.INTEGER,
  parentId: { type: Sequelize.INTEGER, allowNull: true },
});

module.exports = Item;
