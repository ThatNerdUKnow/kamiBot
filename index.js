const User = require("./database/database.js");
const client = require("./twitch/twitch.js");
const chalk = require("chalk");

var peopleWatching = new Object();

client.on("join", (channel, username, self) => {
    if(!self)
    {
        newUser(username);
    }
});

client.on("message", (channel, user, message, self) => {
    var name = user["display-name"];

    if(peopleWatching[name])
    {
        peopleWatching[name].messagesSent++;
    }
    else
    {
        newUser(name);
    }
});

client.on("part",(channel,name,self)=>{
    data = peopleWatching[name]
    user = data.user
    messages = data.messagesSent
    timeWatched = (Date.now()/1000) - data.timeJoined;

    user.messagesSent+=messages;
    user.timeWatched += timeWatched;
    user.save();
})

function newUser(name) {
  var newUser = new User({ uName: name });
  newUser.save().then((val)=>{
      console.log(chalk.underline(name) + " " + chalk.green("Has been added to the database"))
  }).catch((err)=>{
      console.log(chalk.bgRed("ERR!") + ` ${chalk.underline(name)} already in the database`)
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

