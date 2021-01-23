/* eslint-disable camelcase */
// Requiring our models and passport
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely. If the user is created successfully, proceed to log the user in
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Route for getting student/class data for roster table
  app.get("/api/roster", (req, res) => {
    console.log(req.body);
    db.AvailableClasses.findAll({
      where: { day_of_week: "Monday" },
      include: [
        { model: db.Studio, where: { studio_name: "La Mesa" } },
        { model: db.Student }
        //   where: { studio_name: "La Mesa" }
        // },
        // {
        //   model: db.AvailableClasses,
        //   where: { day_of_week: "Wednesday" }
        // }
      ]
    }).then(dbRoster => {
      res.json(dbRoster);
    });
  });

  // Route for getting student data for table
  app.get("/api/students", (req, res) => {
    db.Student.findAll({
      include: [db.Studio]
    }).then(dbStudent => {
      res.json(dbStudent);
    });
  });
  // Route for posting student data
  app.post("/api/students", (req, res) => {
    console.log("OOOOOOOO Let's see what we have : " + req.body);
    db.Student.create({
      last_name: req.body.lastName,
      first_name: req.body.firstName,
      date_of_birth: req.body.birthdate,
      student_status: req.body.inputStatus,
      studio_id: req.body.inputStudio,
      class_id: req.body.classId
    })
      .then(dbStudent => {
        res.json(dbStudent);
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
  // PUT route for updating posts
  app.put("/api/students", (req, res) => {
    db.Student.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbStudent => {
      res.json(dbStudent);
    });
  });

  // Route for getting classes data
  app.get("/api/classes", (req, res) => {
    db.AvailableClasses.findAll({
      include: [db.Studio]
    }).then(dbAvailableClasses => {
      res.json(dbAvailableClasses);
    });
  });
  // Route for posting class data
  app.post("/api/classes", (req, res) => {
    db.AvailableClasses.create({
      studio_id: req.body.studio,
      day_of_week: req.body.day,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      teacher: req.body.teacher
    })
      .then(dbAvailableClasses => {
        res.json(dbAvailableClasses);
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
  // Route for updating class data
  app.put("/api/classes", (req, res) => {
    db.AvailableClasses.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbAvailableClasses => {
      res.json(dbAvailableClasses);
    });
  });
};
