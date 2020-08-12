const FriendSeed = require("../models/friendsModel");
const userSeed = require("../models/loginModel");

const findfriends = async (email) => {
  const user = await userSeed.findAll({
    where: {
      email: email
    }
  });
  const id = user[0].dataValues.Usid;
  const varb = await FriendSeed.findAll({
    where: {
      loginId: id
    }
  });
  return JSON.parse(JSON.stringify(varb));
};

module.exports = findfriends;
