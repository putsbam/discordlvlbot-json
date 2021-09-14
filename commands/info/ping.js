const Discord = require('discord.js')

module.exports = {

    name: "ping",
    category: "info",
    description: "Latency",
  
    run: async(client, message, args, prefix) => {
      
      const firstEmbed = new Discord.MessageEmbed()
      
        .setDescription(`Processing...`)
        .setColor(process.env.EMBEDCOLOR)

        const msg = await message.channel.send(message.author,{ embed: firstEmbed })

        setTimeout( async() => {
          
          let latency = Math.floor(msg.createdTimestamp - message.createdTimestamp)
          let latencyAPI = Math.round(client.ws.ping)
          
          const lastEmbed = new Discord.MessageEmbed()
      
          .setTitle(`Pong!`)
          .setColor(process.env.EMBEDCOLOR)
          .setDescription(`**Latency:** ${latency} ms\n**API latency:** ${latencyAPI} ms`)
          
            await msg.edit(message.author,{embed: lastEmbed })

        }, 2000)
        
    }
}
