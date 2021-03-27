const {
  newUser,
  updateUser,
  peopleWatching,
} = require("./database/userFunctions.js");
const chalk = require("chalk");
const mongoose = require("mongoose");
const events = require("./twitch/events/events.js");

mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((connection, err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully connected to database");
    }
  });
