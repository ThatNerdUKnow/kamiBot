const User = require("./database/database.js");
const client = require("./twitch/twitch.js");

var peopleWatching = new Object();

client.on("join", (channel, username, self) => {
  newUser(username);
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
  newUser.save();

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
