const twitchClient = require("../client/twitchClient");
const { userSchema, User } = require("../../database/schemas/userSchema");
const { vipSchema, Vip } = require("../../database/schemas/vipSchema");
const {
  newUser,
  updateUser,
  peopleWatching,
} = require("../../database/databaseFunctions");

twitchClient.on("join", (channel, username, self) => {
  if (!self) {
    newUser(username);
  }
});

twitchClient.on("message", (channel, user, message, self) => {
  var name = user["display-name"];

  if (peopleWatching[name]) {
    peopleWatching[name].messagesSent++;
  } else {
    newUser(name);
  }
});

twitchClient.on("part", (channel, name, self) => {
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
