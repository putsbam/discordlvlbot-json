// UNDER CONSTRUCTION 😎 COME BACK LATER

const Discord = require("discord.js");

module.exports = {
  name: "xpch",
  category: "admin",
  description:
    "Sets a channel (or channels) to gain XP (the other channels will be removed)",

  run: async (client, message, args, prefix, database) => {
    
    var timestamp = Date.now();
    if (!timestamp) {
      timestamp = function() {
        return new Date().getTime();
      };
    }
    
  }
};
