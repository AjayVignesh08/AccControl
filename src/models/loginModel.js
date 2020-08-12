const { DataTypes } = require("sequelize");
const ACDb = require("../config/db");

const loginUser = ACDb.define("login_user", {
  Usid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    },
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = loginUser;
