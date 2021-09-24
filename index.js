const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('Yo boi!!'))

app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`)
);

//define the libraries
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
//when its ready log it
client.on("ready", ()=>{
  console.log(`${client.user.username} is available now!`)
    let totalUsers = client.guilds.cache.reduce((acc, value) => acc + value.memberCount, 0)
    var activities = [ `${client.guilds.cache.size} servers`, `${totalUsers} users!` ], i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "LISTENING" }),5000)
})
//define welcome "package"
const welcome = require("./welcome");
welcome(client);
//start the bot
client.login(process.env.token);