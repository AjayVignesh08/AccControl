const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const path = require("path");
const findFriends = require("./src/routes/friendsRouter");
const loginRouter = require("./src/routes/loginRouter");
const auth = require("./src/middlewares/auth");
const passiveauth = require("./src/middlewares/passiveauth");
const cookieParser = require("cookie-parser");

const app = express();

// Creating handlebars engine
const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./src/views/layouts"),
  partialsDir: path.join(__dirname, "./src/views/partials")
});

// Let express know to use handlebars
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./src/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/Intro", (request, response) => {
  response.status(200).send("Server Power On");
});

app.get("/", (request, response) => {
  response.status(200).render("home", {
    layout: "hero",
    title: "Home"
  });
});

app.get("/login", passiveauth, (request, response) => {
  response.status(200).render("login", {
    layout: "loginForm",
    title: "Admin",
    submitTarget: "/api/admin/login",
    submitMethod: "POST",
    formTitle: "User Login"
  });
});

app.get("/friends", auth, async (request, response) => {
  try {
    const email = await request.jwt.email;
    const friend = await findFriends(email);
    // console.log(email);
    // console.log(friend);
    response.status(200).render("friends", {
      layout: "navigation",
      title: "Friends",
      data: friend
    });
  } catch (e) {
    console.log(e);
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

app.use("/api/admin", loginRouter);

app.listen(8080, () => {
  console.log("server running");
});
