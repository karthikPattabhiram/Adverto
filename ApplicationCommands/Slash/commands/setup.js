require("dotenv").config();
const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const fetch = require('node-fetch');
const emojis = require("../../../utils/emojis");
const cooldown = new Set();
const wait = require('util').promisify(setTimeout);
const moment = require('moment');


// const credential = require("./../../../credential.json");
// const databaseURL = "https://adverto-920e9-default-rtdb.asia-southeast1.firebasedatabase.app/"
// const Database = require("quick-firebase");
// const db = new Database(databaseURL, credential);



module.exports = {
    name: "setup",
    description: "Configure your server with adverto and allow clients to advertise/sell/hire!",
    type: 1,
    timeout: 5,

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    
    execute: async (client, interaction, args) => {
       
        const embed = new Discord.MessageEmbed()
        .setTitle("Requirements")
        .setDescription("Please make channels with following requirements")
        .addFields({
            name: '1️⃣ Hire',
            value: 'Please make channel with following name "hire" '
        }, {
            name: '2️⃣ Sell',
            value: 'Please make channel with following name "selling"',
            inline: false
        }, {    
            name: '3️⃣ Advertise',
            value: 'Please make channel with following name "Advertising"',
            inline: false
        }, )
        .setFooter('Click done to continue.')
        .setColor("#2f3136")


        const buttonsrow = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('SUCCESS')

                .setLabel('Done')
                .setCustomId("done"),

            new MessageButton()
                .setStyle('DANGER')
                .setLabel('Cancel')
                .setCustomId('cancel'))
           interaction.reply({embeds: [embed], components: [buttonsrow]})
               
                    const amoguscollector = interaction.channel.createMessageComponentCollector({
                        filter: interaction => (interaction.isButton()),
                    })
                    amoguscollector.on("collect", async (interaction) => {

                        if (interaction.customId == "done") {
                        
                    const embedReady = new Discord.MessageEmbed()

                    .setAuthor("Fetching advertising channel", "https://cdn.discordapp.com/emojis/883559221466120263.gif?size=96")
                    .setColor("#2f3136")
                    
                    .setFooter(`This might take a while...`)
                    let msg2 = await interaction.channel.send({embeds: [embedReady]})
            
                    setTimeout(() => {
                        
                    const advertisement = interaction.guild.channels.cache.find(c => c.name === "advertisements"); 




                    if (!advertisement) {
                       
                        
                     const embedReady = new Discord.MessageEmbed()

                    .setAuthor("Fetching advertising channel failed", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                    .setColor("#2f3136")
                    .setDescription(`Failed to fetch advertising channel, Please Change the channel name to advertisements and try again.`)
                    .setFooter(`Please try again later.`)
                        msg2.edit({embeds: [embedReady]})
                        return
                    }
                        const yes = new Discord.MessageEmbed()
                        .setAuthor("Advertising channel found!", "https://images-ext-2.discordapp.net/external/g0b1Zhimx-e6a5mv35i5O7HBCIPHVYifgc494UruZYo/https/images-ext-1.discordapp.net/external/QssUDTEm0jgAt5N_Qj8kzzjJcL53gqfbiloopuh7EPY/https/images-ext-2.discordapp.net/external/Euk4_11WeLVghXuYj50jAqZQhOl_AKIQowNnt4S0yeA/https/media.discordapp.net/attachments/539579135786352652/641188971010850816/627171162857930802.png")
                        .setDescription(`Successfully found advertising channel!`)
                        .setTimestamp()
                        .setColor("#2f3136")
                        msg2.edit({embeds: [yes]}).then( async () => {
                        
                    const hirechannel = new Discord.MessageEmbed()
                    .setAuthor("Fetching Hiring channel", "https://cdn.discordapp.com/emojis/883559221466120263.gif?size=96")
                    .setColor("#2f3136")
                    
                    .setFooter(`This might take a while...`)

                    let msg3 =  await interaction.channel.send({embeds: [hirechannel]})

                        setTimeout(() =>{
                                 
                         const hiring = interaction.guild.channels.cache.find(c => c.name === "hiring"); 

                         if (!hiring) {
                       
                        
                            const embedReady121 = new Discord.MessageEmbed()
       
                           .setAuthor("Fetching hiring channel failed", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                           .setColor("#2f3136")
                           .setDescription(`Failed to fetch hiring channel, Please Change the channel name to hiring and try again.`)
                           .setFooter(`Please try again later.`)
                               msg3.edit({embeds: [embedReady121]})
                               return
                           }

                           const ye1s = new Discord.MessageEmbed()
                        .setAuthor("Hiring channel found!", "https://images-ext-2.discordapp.net/external/g0b1Zhimx-e6a5mv35i5O7HBCIPHVYifgc494UruZYo/https/images-ext-1.discordapp.net/external/QssUDTEm0jgAt5N_Qj8kzzjJcL53gqfbiloopuh7EPY/https/images-ext-2.discordapp.net/external/Euk4_11WeLVghXuYj50jAqZQhOl_AKIQowNnt4S0yeA/https/media.discordapp.net/attachments/539579135786352652/641188971010850816/627171162857930802.png")
                        .setDescription(`Successfully found hiring channel!`)
                        .setTimestamp()
                        .setColor("#2f3136")
                        msg3.edit({embeds: [ye1s]}).then( async() => {
                            


                        const sellchannel = new Discord.MessageEmbed()
                    .setAuthor("Fetching selling channel", "https://cdn.discordapp.com/emojis/883559221466120263.gif?size=96")
                    .setColor("#2f3136")
                    
                    .setFooter(`This might take a while...`)

                    let msg4 =  await interaction.channel.send({embeds: [sellchannel]})

                        setTimeout(() =>{
                                 
                         const selling = interaction.guild.channels.cache.find(c => c.name === "selling"); 

                         if (!selling) {
                       
                        
                            const embedReady1211 = new Discord.MessageEmbed()
       
                           .setAuthor("Fetching selling channel failed", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                           .setColor("#2f3136")
                           .setDescription(`Failed to fetch selling channel, Please Change the channel name to hiring and try again.`)
                           .setFooter(`Please try again later.`)
                               msg4.edit({embeds: [embedReady1211]})
                               return
                           }

                           const ye1s1 = new Discord.MessageEmbed()
                        .setAuthor("Selling channel found!", "https://images-ext-2.discordapp.net/external/g0b1Zhimx-e6a5mv35i5O7HBCIPHVYifgc494UruZYo/https/images-ext-1.discordapp.net/external/QssUDTEm0jgAt5N_Qj8kzzjJcL53gqfbiloopuh7EPY/https/images-ext-2.discordapp.net/external/Euk4_11WeLVghXuYj50jAqZQhOl_AKIQowNnt4S0yeA/https/media.discordapp.net/attachments/539579135786352652/641188971010850816/627171162857930802.png")
                        .setDescription(`Successfully found selling channel!`)
                        .setTimestamp()
                        .setColor("#2f3136")
                        msg4.edit({embeds: [ye1s1]})

                        const done = new Discord.MessageEmbed()
                      
                        .setAuthor("Server is now configured!!","https://images-ext-2.discordapp.net/external/g0b1Zhimx-e6a5mv35i5O7HBCIPHVYifgc494UruZYo/https/images-ext-1.discordapp.net/external/QssUDTEm0jgAt5N_Qj8kzzjJcL53gqfbiloopuh7EPY/https/images-ext-2.discordapp.net/external/Euk4_11WeLVghXuYj50jAqZQhOl_AKIQowNnt4S0yeA/https/media.discordapp.net/attachments/539579135786352652/641188971010850816/627171162857930802.png")
                        .setDescription("Server is now configured! clients can now advertise their respective groups.")
                        .setTimestamp()
                        .setColor("#2f3136")
                        interaction.channel.send({embeds: [done]})
                        }, 3000)

                        })

                        }, 3000);
                    }
                    )
                    }, 3000);
                    
                } 
                if (interaction.customId == "cancel") {
                    return interaction.reply({content: 'Cancelled prompt :/'})
                }
            })
                


    },
};