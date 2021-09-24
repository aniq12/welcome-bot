const config = require("./config");
const knights = require("knights-canvas")
const Discord = require("discord.js");
const { registerFont, createCanvas } = require('canvas')
registerFont('./Roboto-Regular.ttf', { family: 'Roboto' })

module.exports = function (client) {

    const description = {
        name: "WelcomeImages",
        filename: "welcome.js",
        version: "4.8"
    }
    //log that the module is loaded
    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)
    //fires every time when someone joins the server
    client.on("guildMemberAdd", async member => {
      //If not in a guild return
      if(!member.guild) return;
      //create a new knights canvas
      const image = await new knights.Welcome()
    .setUsername(member.user.username)
    .setGuildName(`${member.guild.name}`)
    .setGuildIcon(member.guild.iconURL({ format: 'jpg' }))
    .setMemberCount(`${member.guild.memberCount}`)
    .setAvatar(member.user.displayAvatarURL({ format: 'jpg' }))
    .setBackground("https://i.ibb.co/KhtRxwZ/dark.png")
    .toAttachment();
    const attachment = new Discord.MessageAttachment(image.toBuffer(), 'welcome-image.png');
      //define the welcome embed
      const welcomeembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Welcome", member.guild.iconURL({ dynamic: true }))
        .setDescription(`**Welcome to ${member.guild.name}!**
      Hi <@${member.id}>!, Thanks to join the server`)
        .setImage("attachment://welcome-image.png")
        .attachFiles(attachment);
      //define the welcome channel
      const channel = member.guild.channels.cache.find(ch => ch.id === config.CHANNEL_WELCOME);
      //send the welcome embed to there
      channel.send(welcomeembed);
      //member roles add on welcome every single role
    })
}
