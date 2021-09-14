const Discord = require("discord.js")

module.exports = async (client) => {

   client.user.setPresence({

     status: 'online',
     activity: {
        name: `Starting...⚙️`,
        type: `WATCHING`, 
      }
          
    })

  const activities_list = [

    {
      name: "LVLBOT by @putsbam",
      type: "PLAYING"
    },
    
    {
      name: `🖥️ v1.0`,
      type: "STREAMING"
    },
  ];
 
 setInterval(async () => {

      const randomOption = activities_list[Math.floor(Math.random() * activities_list.length)];
    
      client.user.setActivity(`${randomOption.name}`,{
              type: `${randomOption.type}`,
              url: 'https://twitch.tv/putsbam'

      })
  
  }, 30000)
  console.log(`BOT: ${client.user.tag} ONLINE!`)
  
} 
