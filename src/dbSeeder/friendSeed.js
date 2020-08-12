const Friends = require("../models/friendsModel");

const friendsData = [
  {
    firstName: "Arun",
    lastName: "Kumar",
    age: 16,
    gender: "Male"
  },
  {
    firstName: "Ram",
    lastName: "Kumar",
    age: 16,
    gender: "Male"
  },
  {
    firstName: "Ravi",
    lastName: "Kumar",
    age: 16,
    gender: "Male"
  },
  {
    firstName: "Magesh",
    lastName: "Kumar",
    age: 16,
    gender: "Male"
  },
  {
    firstName: "Suresh",
    lastName: "Kumar",
    age: 16,
    gender: "Male"
  }
];

exports.friendSeeder = async (loginId) => {
  // `force: true` will clear existing tables

  friendsData.forEach(async (element) => {
    try {
      const result = await Friends.create({
        ...element,
        loginId
      });
      console.log(result.get());
    } catch (e) {
      console.error(e);
    }
  });
};
