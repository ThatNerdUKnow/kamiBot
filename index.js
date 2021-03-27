const {
  newUser,
  updateUser,
  peopleWatching,
} = require("./database/database.js");
const client = require("./twitch/twitch.js");
const chalk = require("chalk");

client.on("join", (channel, username, self) => {
  if (!self) {
    newUser(username);
  }
});

client.on("message", (channel, user, message, self) => {
  var name = user["display-name"];

  if (peopleWatching[name]) {
    peopleWatching[name].messagesSent++;
  } else {
    newUser(name);
  }
});

client.on("part", (channel, name, self) => {
  if (peopleWatching[name]) {
    data = peopleWatching[name];

    updateUser(data, name);
  } else {
    console.log(
      chalk.black.bgKeyword("darkorange")("WARN") +
        " untracked user " +
        chalk.underline(name) +
        " left the channel"
    );
  }
});
