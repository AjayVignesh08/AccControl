const { DataTypes } = require("sequelize");
const ACDb = require("../config/db");
const loginuser = require("./loginModel");

const Friends = ACDb.define("Friends_list", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "first_name"
  },
  lastName: {
    type: DataTypes.STRING,
    field: "last_name"
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 3,
      max: 16
    }
  },
  gender: {
    type: DataTypes.ENUM,
    values: ["Male", "Female"],
    allowNull: false
  },
  loginId: {
    type: DataTypes.INTEGER,
    field: "login_id",
    allowNull: false,
    references: {
      model: loginuser,
      key: "Usid"
    }
  }
});

module.exports = Friends;
