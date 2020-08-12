const { verify } = require("../utils/jwtService");

const auth = (req, res, next) => {
  try {
    const payload = verify(req.cookies.jwt);
    if (payload) {
      req.jwt = payload;
      next();
    } else {
      res.redirect("/login");
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = auth;
