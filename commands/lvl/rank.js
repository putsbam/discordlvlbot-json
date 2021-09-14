const Discord = require('discord.js')

module.exports = {

    name: "rank",
    category: "lvl",
    description: "Shows user's current lvl/xp",
  
    run: async(client, message, args, prefix, database) => {
      
    // Get mentioned member (if specified) or author data
      
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0] || message.member.id)) 

    if(!member) return message.channel.send("Invalid Member!")
      
    let userData = database.users.find(u => u.id == member.id)
      
    if(!userData) return message.channel.send("No Results Found!")
      
      const lvlEmbed = new Discord.MessageEmbed()
      
        .setColor(process.env.EMBEDCOLOR)
        .setTitle(`${member.nickname || member.user.tag}`)
        .setThumbnail(`${member.user.avatarURL({dynamic: true})}`)
        .addField(`**XP:**`, `✨ \`${userData.xp}\``, true)
        .addField(`**Current Level:**`, `🏆 \`${userData.lvl}\``, true)
      
     message.reply({ embed: lvlEmbed })
      
  }
}
