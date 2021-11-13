"use strict";
console.clear()
require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: 32767,
});
require("./handler")(client);




const { TOKEN  } = process.env;


module.exports = client;

client.ArrayOfApplicationCommands = new Discord.Collection();



client.login(TOKEN);
