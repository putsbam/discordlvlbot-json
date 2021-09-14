const { Client, Collection } = require("discord.js");
const fs = require("fs");
const client = new Client({
    disableEveryone: true
});
require('dotenv').config()

// Commands Collection

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

// Loading Commands

["command"].forEach(handler => {
 require(`./handlers/${handler}`)(client);
})
 
// Loading Events

fs.readdir("./events/", (err, files) => {
  
  if (err) return console.error(err);
  if(!files) return 
   
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client))
    
    console.log(`Event Loaded: ${eventName}`)
    
  })
})

// Web server to work with monitoring servers
// Such as UptimeRobot

const port = process.env.PORT || 1337;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json("Hello World!");
});
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

client.login(process.env.TOKEN).catch(err => console.log(err))

 
