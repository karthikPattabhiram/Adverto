require("dotenv").config();
const {Collection}= require("discord.js");
const Discord = require("discord.js");
const client = require("../bot.js");
const ms = require('ms')
const emojis = require("../utils/emojis.js");
const { glob } = require("glob");
const { promisify } = require("util");
const badwords = require("../utils/badwords")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('.././');
const fs = require('fs');
const Timeout = new Collection();

client.on("interactionCreate", async (interaction) => {
    try
    {
     
        const cmd = client.ArrayOfApplicationCommands.get(interaction.commandName);
        if (!cmd)
            return
        const args = [];
        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
      



            if (cmd) {
                if(cmd.timeout) {
                    if(Timeout.has(`${cmd.name}${interaction.user.id}${interaction.guild.id}`)) {
                        const cooldown = new Discord.MessageEmbed() 
                        .setTitle("Cooldown")
                        .setDescription(`You need to wait \`${ms(Timeout.get(`${cmd.name}${interaction.user.id}${interaction.guild.id}`) - Date.now(), { long: true } )}\`  before you can use this command again`)
                        .setTimestamp()
                        .setColor("#2f3136")
                        .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                        return interaction.reply({ embeds: [cooldown] })
                    }
                    

                   
                    cmd.execute(client, interaction, args)
                    Timeout.set(`${cmd.name}${interaction.user.id}${interaction.guild.id}`, Date.now() + cmd.timeout)
                    setTimeout(() => {
                        Timeout.delete(`${cmd.name}${interaction.user.id}`)
                    }, cmd.timeout)

                   
                }
               
            }

    }
    catch(error)
    {
        console.log("Error in /events/interactionCreate.js", error)

    }
});
