const tmi = require("tmi.js")

const client = new tmi.Client({
    connection: {reconnect:true},
    channels: ["moistcr1tikal"]
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