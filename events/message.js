const { Client, MessageEmbed } = require("discord.js");
const client = new Client({
  disableEveryone: true
});
const fs = require("fs");

//cooldown set

let cooldownXP = new Set();
let cdXPSeconds = 60;


module.exports = async (client, message) => {
  
  if (!message.guild) return;
  if (message.author.bot) return;
  if (!message.member) message.member = await message.guild.members.fetch(message.author);

  const prefix = process.env.PREFIX;
  
  // Database process =============================================
  
  let jsonInput = fs.readFileSync('database.json') // Read Database

  if (!jsonInput) return console.log("NO DATABASE FOUND")

  let jsonData = JSON.parse(jsonInput)
          
  var database = jsonData

  // ==============================================================
  
  // Run messages starting with prefix (commands)
  
  if (message.content.startsWith(prefix)) {
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);

    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    // Get the command
    let command = client.commands.get(cmd);
    
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) command.run(client, message, args, prefix, database);
    
  } else { // Other messages (all) giving xp

    // ------------------------------------------------------------------

          let usersArray = database.users // Array containing all users data (id, xp, lvl)

          // If the user doesnt exist on the database, create a new one

          if (!usersArray.some(u => u.id == message.author.id)) {

            usersArray.push({ id: message.author.id, xp: 0, lvl: 0}) // Set all to 0 (initial xp)

          } else { // But if the user does exist, just going to update data
            
          // Setting the xp gain cooldown
            
          if (cooldownXP.has(message.author.id)) return console.log(`Cooldown: ${message.author.id}`)

          cooldownXP.add(message.author.id);

            for (var i = 0; i < usersArray.length; i++) {

              if (usersArray[i].id === message.author.id) {
                
              // Setting the random xp and current lvl

              var randomXP = Math.floor(Math.random() * 20) + 1; // range 1 - 20

                usersArray[i].xp = usersArray[i].xp + randomXP
                usersArray[i].lvl = Math.floor(0.1 * Math.sqrt(usersArray[i].xp)) // Rounding the lvl value based on xp

                break;

              }
            }

          }

          var json = JSON.stringify(database, null, 2)

          // writing database

          fs.writeFileSync('database.json', json); 
    
          setTimeout(() => {

            cooldownXP.delete(message.author.id)

          }, cdXPSeconds * 1000)

      
  }
};
