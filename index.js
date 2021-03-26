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
    
    if(peopleWatching[name])
    {
    data = peopleWatching[name]

    user = data.user
    messages = data.messagesSent
    timeWatched = (Date.now()/1000) - data.timeJoined;

    user.messagesSent+=messages;
    user.timeWatched += timeWatched;
    user.save();
    peopleWatching[name] = undefined;
    console.log(chalk.black.bgGreen("UPD") + " " + chalk.underline(name) + " " + chalk.green("Has been updated"))
    }
    else
    {
        console.log(chalk.black.bgKeyword('darkorange')("WARN") + " untracked user " + chalk.underline(name) + " left the channel")
    }
})

async function newUser(name) {
  var newUser = new User({ uName: name });
  await newUser.save().then((val)=>{
      console.log(chalk.black.bgGreen("NEW") + " " + chalk.underline(name) + " " + chalk.green("Has been added to the database"))
  }).catch(async(err)=>{
      console.log(chalk.bgRed("ERR!") + ` ${chalk.underline(name)} already in the database`)
      newUser = await User.findOne({uName:name});
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

