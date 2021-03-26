const tmi = require("tmi.js")
require('dotenv').config()

const client = new tmi.Client({
    connection: {reconnect:true},
    channels: [process.env.CHANNEL]
})

client.connect().then((conn,err)=>{
    if(err)
    {
        console.error(err);
    }
    else
    {
        console.log("Connected to twitch chat")
    }
});

module.exports = client;