const loginUser = require("../models/loginModel");
const { friendSeeder } = require("./friendSeed");
const Friends = require("../models/friendsModel");
const { hash } = require("../utils/hash");

const newLogin = [
  {
    email: "ajay@gmail.com",
    password: hash("ajayvignesh08")
  },
  {
    email: "sathesh@gmail.com",
    password: hash("satheshn")
  }
];

const loginSeeder = async () => {
  await loginUser.sync({ force: true });
  await Friends.sync({ force: true });
  newLogin.forEach(async (element) => {
    try {
      const result = await loginUser.create(element);
      console.log(result.get());
      const { Usid } = result.get();
      friendSeeder(Usid);
    } catch (e) {
      console.error(e);
    }
  });
};

loginSeeder();
