/* eslint-disable indent */
// Requiring necessary npm packages
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

//Set up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// register new handlebars helper function
const hbs = exphbs.create({});
hbs.handlebars.registerHelper("checkDay", value => {
  // eslint-disable-next-line prefer-const
  let newDate = new Date();
  let dayOfWeek = newDate.getDay();
  function formatDayOfWeek() {
    switch (dayOfWeek) {
      case 0:
        dayOfWeek = "Sunday";
        break;
      case 1:
        dayOfWeek = "Monday";
        break;
      case 2:
        dayOfWeek = "Tuesday";
        break;
      case 3:
        dayOfWeek = "Wednesday";
        break;
      case 4:
        dayOfWeek = "Thursday";
        break;
      case 5:
        dayOfWeek = "Friday";
        break;
      case 6:
        dayOfWeek = "Saturday";
        break;
      default:
        console.log("error");
    }
  }
  formatDayOfWeek();
  if (dayOfWeek === value) {
    return true;
    // eslint-disable-next-line no-else-return
  } else {
    return false;
  }
});
hbs.handlebars.registerHelper("checkStudio1", value => {
  if (value === 1) {
    return true;
  }
});
hbs.handlebars.registerHelper("checkStudio2", value => {
  if (value === 2) {
    return true;
  }
});
hbs.handlebars.registerHelper("checkStudio3", value => {
  if (value === 3) {
    return true;
  }
});

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
