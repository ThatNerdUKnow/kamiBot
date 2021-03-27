const { userSchema, User } = require("./schemas/userSchema.js");
const chalk = require("chalk");

var peopleWatching = new Object();

async function updateUser(data, name) {
  user = data.user;
  messages = data.messagesSent;
  timeWatched = (Date.now() / 1000 - data.timeJoined) / 60;

  user.messagesSent += messages;
  user.timeWatched += timeWatched;
  user.save();
  peopleWatching[name] = undefined;
  console.log(
    chalk.black.bgCyan("UPD") +
      " " +
      chalk.underline(name) +
      " " +
      chalk.green("Has been updated")
  );
}

async function newUser(name) {
  var newUser = new User({ uName: name });
  await newUser
    .save()
    .then((val) => {
      console.log(
        chalk.black.bgGreen("NEW") +
          " " +
          chalk.underline(name) +
          " " +
          chalk.green("Has been added to the database")
      );
    })
    .catch(async (err) => {
      console.log(
        chalk.bgRed("DUPE") +
          ` ${chalk.underline(name)} already in the database`
      );
      newUser = await User.findOne({ uName: name });
    });

  if (!peopleWatching[name]) {
    peopleWatching[name] = {
      user: newUser,
      timeJoined: Date.now() / 1000,
      messagesSent: 0,
    };
  } else {
    // This person already exists
  }
}

module.exports = { newUser, updateUser, peopleWatching };
