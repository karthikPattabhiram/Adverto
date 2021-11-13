require("dotenv").config();
const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const fetch = require('node-fetch');
const emojis = require("../../../utils/emojis");
const cooldown = new Set();
const wait = require('util').promisify(setTimeout);
const moment = require('moment');
const { db } = require("../../../handler/database");

const {
    MessageActionRow,
    MessageButton
} = require('discord.js');




module.exports = {
    name: "advertise",
    description: "idk",
    timeout: 5,
    type: 1,

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    execute: async (client, interaction, args, Database) => {







        try {


            const embedReady = new Discord.MessageEmbed()

                .setAuthor("Check your DMs", "https://images-ext-1.discordapp.net/external/QssUDTEm0jgAt5N_Qj8kzzjJcL53gqfbiloopuh7EPY/https/images-ext-2.discordapp.net/external/Euk4_11WeLVghXuYj50jAqZQhOl_AKIQowNnt4S0yeA/https/media.discordapp.net/attachments/539579135786352652/641188971010850816/627171162857930802.png")
                .setColor("#2f3136")
                .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                .setFooter(`Didn't get a message? Make sure your DMs are opened!`)

            interaction.reply({
                embeds: [embedReady]
            })




            //adverts db 
            const buttonsrow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('SUCCESS')

                        .setLabel('Continue')
                        .setCustomId("yos"),

                    new MessageButton()
                        .setStyle('DANGER')
                        .setLabel('Cancel prompt')
                        .setCustomId('nos'))


            const cooldown = new Discord.MessageEmbed()
                .setTitle("Thanks for using Adverto!")
                .setDescription("We will save your advertisement data in our database so that its easier for you to advertise for next time.")
                .setTimestamp()
                .setColor("#2f3136")
                .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
            interaction.member.send({ embeds: [cooldown], components: [buttonsrow] }).then(msg => {

                const confcollector1 = msg.createMessageComponentCollector({

                })
                confcollector1.on("collect", async (i) => {

                    if (i.customId == "yos") {





                        db.has(`advertisers.users.${interaction.user.id}`).then((result) => {
                            console.log(result); // => true
                            if (result === false) {
                                console.log('ok')


                                const buttonsrow121221 = new MessageActionRow()
                                    .addComponents(
                                        new MessageButton()
                                            .setStyle('SUCCESS')
                                            .setDisabled(true)
                                            .setLabel('Continue')
                                            .setCustomId("yos"),

                                        new MessageButton()
                                            .setStyle('DANGER')
                                            .setLabel('Cancel prompt')
                                            .setCustomId('nos')
                                            .setDisabled(true))


                                const cooldown = new Discord.MessageEmbed()
                                    .setTitle("Thanks for using Adverto!")
                                    .setDescription("We will save your advertisement data in our database so that its easier for you to advertise for next time.")
                                    .setTimestamp()
                                    .setColor("#2f3136")
                                    .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                                msg.edit({ embeds: [cooldown], components: [buttonsrow121221] })


                                const test = new Discord.MessageEmbed()

                                    .setTitle("Group name")
                                    .setDescription("What is your group name?")

                                    .setColor("#2f3136")
                                    .setTimestamp()


                                i.reply({
                                    embeds: [test],
                                    fetchReply: true
                                }).then(msg => {


                                    msg.channel.awaitMessages({
                                         time: 5 * 60000,
                                        max: 1,

                                    }).then(message1 => {

                                        let msg1 = message1.first().content
                                        console.log(msg1)
                                        if (msg1.toLowerCase() === "cancel") return interaction.member.send("Ok, I have cancelled this process")

                                        const descriptioncollector = new Discord.MessageEmbed()
                                            .setTitle("Description")
                                            .setDescription("What is your description?")

                                            .setColor("#2f3136")
                                            .setTimestamp()

                                        interaction.member.send({
                                            embeds: [descriptioncollector]
                                        }).then(msg => {

                                            msg.channel.awaitMessages({
                                                time: 5 * 60000,
                                                max: 1
                                            }).then(messages => {
                                                let msg2 = messages.first().content
                                                console.log(msg2)
                                                if (msg2.toLowerCase() === "cancel") return interaction.member.send("Ok, I have cancelled this process")


                                                const invcollection = new Discord.MessageEmbed()
                                                    .setTitle("invite")
                                                    .setDescription("What is your discord invite link?")
                                                    .setColor("#2f3136")
                                                    .setFooter("Must include https://discord.gg/")

                                                    .setTimestamp()

                                                interaction.member.send({
                                                    embeds: [invcollection]
                                                }).then(msg => {

                                                    msg.channel.awaitMessages({
                                                        time: 5 * 60000,
                                                        max: 1
                                                    }).then(messages => {
                                                        let msg3 = messages.first().content
                                                        console.log(msg3)
                                                        if (msg3.toLowerCase() === "cancel") return interaction.member.send("Ok, I have cancelled this process")
                                                        if (msg3.toLowerCase() === "cancel") return interaction.member.send("Ok, I have cancelled this process")
                                                        const imagecollection = new Discord.MessageEmbed()
                                                            .setTitle("Image")
                                                            .setDescription("Please give me an image link.")
                                                            .setFooter('Type "skip" to skip image.')

                                                            .setColor("#2f3136")
                                                            .setTimestamp()

                                                        interaction.member.send({
                                                            embeds: [imagecollection]
                                                        }).then(msg => {

                                                            msg.channel.awaitMessages({
                                                                time: 5 * 60000,
                                                                max: 1
                                                            }).then(async messages => {
                                                                let msg4 = messages.first().content


                                                                if (msg4.toLowerCase() === "cancel") return interaction.member.send("Ok, I have cancelled this process")
                                                                if (msg4.toLowerCase() === "skip") {


                                                                    db.set(`adverts/users/${interaction.member.id}/groupimg`, `${'https://media.discordapp.net/attachments/849989987650764810/897400578861326347/Frame_106.png?width=1440&height=596'}`)

                                                                    const buttonsrow = new MessageActionRow()
                                                                        .addComponents(
                                                                            new MessageButton()
                                                                                .setStyle('SUCCESS')

                                                                                .setLabel('Yes')
                                                                                .setCustomId("post"),

                                                                            new MessageButton()
                                                                                .setStyle('DANGER')
                                                                                .setLabel('No')
                                                                                .setCustomId('nopost'))
                                                                    //saving the data 
                                                                    db.set(`adverts/users/${interaction.member.id}/groupname`, `${msg1}`)
                                                                    db.set(`adverts/users/${interaction.member.id}/groupdesc`, `${msg2}`)

                                                                    db.set(`adverts/users/${interaction.member.id}/groupninv`, `${msg3}`)
                                                                    //geting the saved data, use full for advert embed
                                                                    let grpname = await db.get(`adverts.users.${interaction.member.id}.groupname`)
                                                                    let grpdesc = await db.get(`adverts.users.${interaction.member.id}.groupdesc`)
                                                                    let groimg = await db.get(`adverts.users.${interaction.member.id}.groupimg`)
                                                                    let inv = await db.get(`adverts.users.${interaction.member.id}.groupninv`)


                                                                    const advertembed = new Discord.MessageEmbed()
                                                                        .setTitle(`${grpname}`)
                                                                        .setDescription(`${grpdesc}`)

                                                                        .setImage(groimg)
                                                                        .setColor("#2f3136")

                                                                    interaction.member.send({
                                                                        content: `Would you like use this?`
                                                                    })

                                                                    interaction.member.send({
                                                                        embeds: [advertembed],
                                                                        components: [buttonsrow]
                                                                    }).then(msg => {

                                                                        const confcollector = msg.createMessageComponentCollector({

                                                                        })
                                                                        confcollector.on("collect", async (i) => {

                                                                            if (i.customId == "post") {

                                                                                const buttonsrow11 = new MessageActionRow()
                                                                                    .addComponents(
                                                                                        new MessageButton()
                                                                                            .setStyle('SUCCESS')
                                                                                            .setDisabled(true)
                                                                                            .setLabel('Yes')
                                                                                            .setCustomId("post"),

                                                                                        new MessageButton()
                                                                                            .setStyle('DANGER')
                                                                                            .setLabel('No')
                                                                                            .setDisabled(true)
                                                                                            .setCustomId('nopost'))


                                                                                const advertembed1 = new Discord.MessageEmbed()
                                                                                    .setTitle(`${grpname}`)
                                                                                    .setDescription(`${grpdesc}`)

                                                                                    .setImage(groimg)
                                                                                    .setColor("#2f3136")

                                                                                msg.edit({
                                                                                    embeds: [advertembed1],
                                                                                    components: [buttonsrow11]
                                                                                })

                                                                                let inv1 = await db.get(`adverts.users.${interaction.member.id}.groupninv`)
                                                                                console.log(inv)
                                                                                confcollector.stop()
                                                                                const buttonsrow1212 = new MessageActionRow()
                                                                                    .addComponents(
                                                                                        new MessageButton()
                                                                                            .setStyle('LINK')

                                                                                            .setLabel('Invite link')
                                                                                            .setURL(inv1),


                                                                                    )
                                                                                const advertembed = new Discord.MessageEmbed()
                                                                                    .setTitle(`${grpname}`)
                                                                                    .setDescription(`${grpdesc}`)

                                                                                    .setImage(groimg)
                                                                                    .setColor("#2f3136")

                                                                                const Done = new Discord.MessageEmbed()



                                                                                    .setAuthor("I have posted the advertisement.", "https://images-ext-1.discordapp.net/external/QssUDTEm0jgAt5N_Qj8kzzjJcL53gqfbiloopuh7EPY/https/images-ext-2.discordapp.net/external/Euk4_11WeLVghXuYj50jAqZQhOl_AKIQowNnt4S0yeA/https/media.discordapp.net/attachments/539579135786352652/641188971010850816/627171162857930802.png")
                                                                                    .setColor("#2f3136")
                                                                                    .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                                                                                    .setDescription("I have saved the advertisement, There will be no need to type the advertisement next time!")




                                                                                db.set(`advertisers/users/${interaction.member.id}`, `He did it`)
                                                                                await i.reply({
                                                                                    embeds: [Done]
                                                                                })
                                                                                await client.channels.cache.get('890876595626188820').send({
                                                                                    embeds: [advertembed],
                                                                                    components: [buttonsrow1212],
                                                                                    content: `Posted by <@${interaction.member.id}>`
                                                                                })
                                                                            }
                                                                            if (i.customId == 'nopost') {
                                                                                confcollector.stop()

                                                                                const buttonsrow11 = new MessageActionRow()
                                                                                    .addComponents(
                                                                                        new MessageButton()
                                                                                            .setStyle('SUCCESS')
                                                                                            .setDisabled(true)
                                                                                            .setLabel('Yes')
                                                                                            .setCustomId("post"),

                                                                                        new MessageButton()
                                                                                            .setStyle('DANGER')
                                                                                            .setLabel('No')
                                                                                            .setDisabled(true)
                                                                                            .setCustomId('nopost'))


                                                                                const advertembed1 = new Discord.MessageEmbed()
                                                                                    .setTitle(`${grpname}`)
                                                                                    .setDescription(`${grpdesc}`)

                                                                                    .setImage(groimg)
                                                                                    .setColor("#2f3136")

                                                                                msg.edit({
                                                                                    embeds: [advertembed1],
                                                                                    components: [buttonsrow11]
                                                                                })

                                                                                //if user selects cancel then it will delete all saved data so that he can try again 
                                                                                db.delete(`adverts.users.${interaction.member.id}.groupname`)
                                                                                db.delete(`adverts.users.${interaction.member.id}.groupdesc`)
                                                                                db.delete(`adverts.users.${interaction.member.id}.groupimg`)
                                                                                db.delete(`adverts.users.${interaction.member.id}.groupninv`)

                                                                                const errorembed12 = new Discord.MessageEmbed()
                                                                                    .setAuthor("Cancelled prompt.", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                                                    .setColor("#2f3136")
                                                                                    .setDescription(`try again next time.`)
                                                                                    .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                                                                                    .setFooter(`Powered by Adverto.`)
                                                                                return i.reply({
                                                                                   embeds: [errorembed12]
                                                                                })

                                                                            }
                                                                        })
                                                                    })








                                                                    return
                                                                }
                                                                //image collection
                                                                let imagelinkcollection = messages.first().content
                                                                console.log(imagelinkcollection)
                                                                // saving data in db


                                                                db.set(`adverts/users/${interaction.member.id}/groupname`, `${msg1}`)
                                                                db.set(`adverts/users/${interaction.member.id}/groupdesc`, `${msg2}`)
                                                                db.set(`adverts/users/${interaction.member.id}/groupimg`, `${imagelinkcollection}`)
                                                                db.set(`adverts/users/${interaction.member.id}/groupninv`, `${msg3}`)


                                                                //geting db for embed
                                                                let grpname = await db.get(`adverts.users.${interaction.member.id}.groupname`)
                                                                let grpdesc = await db.get(`adverts.users.${interaction.member.id}.groupdesc`)
                                                                let groimg = await db.get(`adverts.users.${interaction.member.id}.groupimg`)
                                                                let inv = await db.get(`adverts.users.${interaction.member.id}.groupinv`)


                                                                // const buttonsrow212123 = new MessageActionRow()
                                                                //     .addComponents(
                                                                //         new MessageButton()
                                                                //             .setStyle('SUCCESS')   

                                                                //             .setLabel('Yes')   
                                                                //             .setCustomId("post21"),   

                                                                //         new MessageButton()   
                                                                //             .setStyle('DANGER')   
                                                                //             .setLabel('No')   
                                                                //             .setCustomId('nopost12'))   



                                                                // // const slotcomfirm = new Discord.MessageEmbed()

                                                                // // .setTitle('Would you like to save this advertisement in your first slot?')
                                                                // // .setDescription("This advertisiment will be saved in your first slot upon your agreement")
                                                                // // .setFooter('You can post advertisement from this selected slot from next time')
                                                                // .setTimestamp()
                                                                // interaction.member.send({embeds:[slotcomfirm], components: [buttonsrow212123]}).then((msg) => {

                                                                // const confcollector = msg.createMessageComponentCollector({

                                                                // })
                                                                // confcollector.on("collect", async (interaction) => {

                                                                //     if (interaction.customId == "post21") {


                                                                //         const savingdata = new Discord.MessageEmbed()
                                                                //         .setAuthor('Saving Data', 'https://cdn.discordapp.com/emojis/812342403288662046.gif?size=9')
                                                                //         .setDescription('Saving data this might take few seconds ...')

                                                                //         db.set(`Advertise_group_name_slot1_${interaction.member.id}`, `${msg1}`)
                                                                //         db.set(`Advertise_group_des_slot1_${interaction.member.id}`, `${msg2}`)
                                                                //         db.set(`Advertise_group_IMG_slot1_${interaction.member.id}`, `${imagelinkcollection}`)
                                                                //         db.set(`Advertise_group_inv_slot1_${interaction.member.id}`, `${msg3}`)
                                                                //         db.set(`Advertise_slot1_${interaction.member.id}`, `he did it!!!`)
                                                                //         interaction.member.send({embeds: [savingdata]})



                                                                //     }
                                                                // })
                                                                // })




                                                                const buttonsrow = new MessageActionRow()
                                                                    .addComponents(
                                                                        new MessageButton()
                                                                            .setStyle('SUCCESS')

                                                                            .setLabel('Yes')
                                                                            .setCustomId("post"),

                                                                        new MessageButton()
                                                                            .setStyle('DANGER')
                                                                            .setLabel('No')
                                                                            .setCustomId('nopost'))



                                                                const advertembed = new Discord.MessageEmbed()
                                                                    .setTitle(`${grpname}`)
                                                                    .setDescription(`${grpdesc}`)

                                                                    .setImage(groimg)
                                                                    .setColor("#2f3136")

                                                                interaction.member.send({
                                                                    content: `Would you like use this?`
                                                                })
                                                                interaction.member.send({
                                                                    embeds: [advertembed],
                                                                    components: [buttonsrow]
                                                                }).then(msg => {

                                                                    const confcollector = msg.createMessageComponentCollector({

                                                                    })
                                                                    confcollector.on("collect", async (i) => {

                                                                        if (i.customId == "post") {
                                                                            const buttonsrow11 = new MessageActionRow()
                                                                                    .addComponents(
                                                                                        new MessageButton()
                                                                                            .setStyle('SUCCESS')
                                                                                            .setDisabled(true)
                                                                                            .setLabel('Yes')
                                                                                            .setCustomId("post"),

                                                                                        new MessageButton()
                                                                                            .setStyle('DANGER')
                                                                                            .setLabel('No')
                                                                                            .setDisabled(true)
                                                                                            .setCustomId('nopost'))


                                                                                const advertembed1 = new Discord.MessageEmbed()
                                                                                    .setTitle(`${grpname}`)
                                                                                    .setDescription(`${grpdesc}`)

                                                                                    .setImage(groimg)
                                                                                    .setColor("#2f3136")

                                                                                msg.edit({
                                                                                    embeds: [advertembed1],
                                                                                    components: [buttonsrow11]
                                                                                })

                                                                            let inv1 = await db.get(`adverts.users.${interaction.member.id}.groupninv`)
                                                                            console.log(inv)

                                                                            confcollector.stop()
                                                                            const buttonsrow = new MessageActionRow()
                                                                                .addComponents(
                                                                                    new MessageButton()
                                                                                        .setStyle('LINK')

                                                                                        .setLabel('Invite link')
                                                                                        .setURL(inv1),


                                                                                )
                                                                            const advertembed = new Discord.MessageEmbed()
                                                                                .setTitle(`${grpname}`)
                                                                                .setDescription(`${grpdesc}`)

                                                                                .setImage(groimg)
                                                                                .setColor("#2f3136")

                                                                            const Done = new Discord.MessageEmbed()



                                                                                .setAuthor("I have posted the advertisement.", "https://images-ext-1.discordapp.net/external/QssUDTEm0jgAt5N_Qj8kzzjJcL53gqfbiloopuh7EPY/https/images-ext-2.discordapp.net/external/Euk4_11WeLVghXuYj50jAqZQhOl_AKIQowNnt4S0yeA/https/media.discordapp.net/attachments/539579135786352652/641188971010850816/627171162857930802.png")
                                                                                .setColor("#2f3136")
                                                                                .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                                                                                .setDescription("I have saved the advertisement, There will be no need to type the advertisement next time!")


                                                                            // saving data as he previously did advertisement
                                                                            db.set(`advertisers/users/${interaction.member.id}`, `He did it`)
                                                                            await i.reply({
                                                                                embeds: [Done]
                                                                            })
                                                                            await client.channels.cache.get('890876595626188820').send({
                                                                                embeds: [advertembed],
                                                                                components: [buttonsrow],
                                                                                content: `Posted by <@${interaction.user.id}>`
                                                                            })
                                                                        }
                                                                        if (i.customId == 'nopost') {
                                                                            confcollector.stop()


                                                                            const buttonsrow11 = new MessageActionRow()
                                                                            .addComponents(
                                                                                new MessageButton()
                                                                                    .setStyle('SUCCESS')
                                                                                    .setDisabled(true)
                                                                                    .setLabel('Yes')
                                                                                    .setCustomId("post"),

                                                                                new MessageButton()
                                                                                    .setStyle('DANGER')
                                                                                    .setLabel('No')
                                                                                    .setDisabled(true)
                                                                                    .setCustomId('nopost'))


                                                                        const advertembed1 = new Discord.MessageEmbed()
                                                                            .setTitle(`${grpname}`)
                                                                            .setDescription(`${grpdesc}`)

                                                                            .setImage(groimg)
                                                                            .setColor("#2f3136")

                                                                        msg.edit({
                                                                            embeds: [advertembed1],
                                                                            components: [buttonsrow11]
                                                                        })

                                                                            //if user selects cancel then it will delete all saved data so that he can try again 
                                                                            db.delete(`adverts.users.${interaction.member.id}.groupname`)
                                                                            db.delete(`adverts.users.${interaction.member.id}.groupdesc`)
                                                                            db.delete(`adverts.users.${interaction.member.id}.groupimg`)
                                                                            db.delete(`adverts.users.${interaction.member.id}.groupinv`)

                                                                            const errorembed12 = new Discord.MessageEmbed()
                                                                                    .setAuthor("Cancelled prompt.", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                                                    .setColor("#2f3136")
                                                                                    .setDescription(`try again next time.`)
                                                                                    .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                                                                                    .setFooter(`Powered by Adverto.`)
                                                                                return i.reply({
                                                                                   embeds: [errorembed12]
                                                                                })

                                                                        }
                                                                    })
                                                                })




                                                            }).catch((error) => {
                                                                const errorembed = new Discord.MessageEmbed()
                                                                    .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                                    .setColor("#2f3136")
                                                                    .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                                                    .addFields({
                                                                        name: 'Error was ',
                                                                        value: `${error}`
                                                                    })

                                                                    .setTimestamp()
                                                                db.set(`bugs/occured/messagecollection`, `${error}`)
                                                                interaction.member.send({ embeds: [errorembed] })
                                                            });
                                                        }).catch((error) => {
                                                            const errorembed = new Discord.MessageEmbed()
                                                                .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                                .setColor("#2f3136")
                                                                .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                                                .addFields({
                                                                    name: 'Error was ',
                                                                    value: `${error}`
                                                                })

                                                                .setTimestamp()
                                                            db.set(`bugs/occured/messagecollection`, `${error}`)
                                                            interaction.member.send({ embeds: [errorembed] })
                                                        });

                                                    }).catch((error) => {
                                                        const errorembed = new Discord.MessageEmbed()
                                                            .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                            .setColor("#2f3136")
                                                            .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                                            .addFields({
                                                                name: 'Error was ',
                                                                value: `${error}`
                                                            })

                                                            .setTimestamp()
                                                        db.set(`bugs/occured/messagecollection`, `${error}`)
                                                        interaction.member.send({ embeds: [errorembed] })
                                                    });
                                                }).catch((error) => {
                                                    const errorembed = new Discord.MessageEmbed()
                                                        .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                        .setColor("#2f3136")
                                                        .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                                        .addFields({
                                                            name: 'Error was ',
                                                            value: `${error}`
                                                        })

                                                        .setTimestamp()
                                                    db.set(`bugs/occured/messagecollection`, `${error}`)
                                                    interaction.member.send({ embeds: [errorembed] })
                                                });
                                            }).catch((error) => {
                                                const errorembed = new Discord.MessageEmbed()
                                                    .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                    .setColor("#2f3136")
                                                    .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                                    .addFields({
                                                        name: 'Error was ',
                                                        value: `${error}`
                                                    })

                                                    .setTimestamp()
                                                db.set(`bugs/occured/messagecollection`, `${error}`)
                                                interaction.member.send({ embeds: [errorembed] })
                                            });
                                        }).catch((error) => {
                                            const errorembed = new Discord.MessageEmbed()
                                                .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                .setColor("#2f3136")
                                                .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                                .addFields({
                                                    name: 'Error was ',
                                                    value: `${error}`
                                                })

                                                .setTimestamp()
                                            db.set(`bugs/occured/messagecollection`, `${error}`)
                                            interaction.member.send({ embeds: [errorembed] })
                                        });
                                    }).catch((error) => {
                                        const errorembed = new Discord.MessageEmbed()
                                            .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                            .setColor("#2f3136")
                                            .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                            .addFields({
                                                name: 'Error was ',
                                                value: `${error}`
                                            })

                                            .setTimestamp()
                                        db.set(`bugs/occured/messagecollection`, `${error}`)
                                        interaction.member.send({ embeds: [errorembed] })
                                    });
                                }).catch((error) => {
                                    const errorembed = new Discord.MessageEmbed()
                                        .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                        .setColor("#2f3136")
                                        .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                        .addFields({
                                            name: 'Error was ',
                                            value: `${error}`
                                        })

                                        .setTimestamp()
                                    db.set(`bugs/occured/messagecollection`, `${error}`)
                                    interaction.member.send({ embeds: [errorembed] })
                                });





                            } if (result === true)  {
                                //if data found 
                                const buttonsrow121221 = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setStyle('SUCCESS')
                                        .setDisabled(true)
                                        .setLabel('Continue')
                                        .setCustomId("yos"),

                                    new MessageButton()
                                        .setStyle('DANGER')
                                        .setLabel('Cancel prompt')
                                        .setCustomId('nos')
                                        .setDisabled(true))


                            const cooldown = new Discord.MessageEmbed()
                                .setTitle("Thanks for using Adverto!")
                                .setDescription("We will save your advertisement data in our database so that its easier for you to advertise for next time.")
                                .setTimestamp()
                                .setColor("#2f3136")
                                .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                            msg.edit({ embeds: [cooldown], components: [buttonsrow121221] })

                                const sellchannel = new Discord.MessageEmbed()
                                .setAuthor("Fetching your advertisement data", "https://cdn.discordapp.com/emojis/883559221466120263.gif?size=96")
                                .setColor("#2f3136")
                                .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                                .setFooter(`This might take a while...`)
            
                                    i.reply({embeds: [sellchannel]})


                                setTimeout(() =>{

                                const datafound = new Discord.MessageEmbed()
                                    .setTitle("Data found!")
                                    .setDescription("We found your last advertisement data, Would you like to use that?")
                                    .addFields({
                                        name: '1️⃣ Use old advertisement data.',
                                        value: 'We found your last advertisement data, Would you like to use that?'
                                    }, {
                                        name: '2️⃣ New data.',
                                        value: 'Would u like to create a new advertisement data?',
                                        inline: false
                                    })
                                    .setColor("#2f3136")
                                    .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")

                                const row = new MessageActionRow()
                                    .addComponents(
                                        new MessageButton()
                                            .setCustomId('yes')
                                            .setLabel('1️')
                                            .setStyle('SECONDARY'),
                                        new MessageButton()
                                            .setCustomId("new")
                                            .setLabel("2️")
                                            .setStyle("SECONDARY"),
                                        new MessageButton()
                                            .setCustomId("cancel")
                                            .setLabel("Cancel Prompt.")
                                            .setStyle("DANGER"))


                                        i.editReply({
                                    embeds: [datafound],
                                    components: [row]
                                }).then(msg1 => {


                                    const amoguscollector = msg1.createMessageComponentCollector({
                                        filter: interaction => (interaction.isButton())
                                    })
                                    amoguscollector.on("collect", async (i) => {


                                        if (i.customId == "yes") {

                                            


                                            const datafound = new Discord.MessageEmbed()
                                            .setTitle("Data found!")
                                            .setDescription("We found your last advertisement data, Would you like to use that?")
                                            .addFields({
                                                name: '1️⃣ Use old advertisement data.',
                                                value: 'We found your last advertisement data, Would you like to use that?'
                                            }, {
                                                name: '2️⃣ New data.',
                                                value: 'Would u like to create a new advertisement data?',
                                                inline: false
                                            })
                                            .setColor("#2f3136")
                                            .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
        
                                        const row = new MessageActionRow()
                                            .addComponents(
                                                new MessageButton()
                                                    .setCustomId('yes')
                                                    .setLabel('1️')
                                                    .setDisabled(true)
                                                    .setStyle('SUCCESS'),
                                                new MessageButton()
                                                    .setCustomId("new")
                                                    .setLabel("2️")
                                                    .setDisabled(true)
                                                    .setStyle("SECONDARY"),
                                                new MessageButton()
                                                    .setDisabled(true)
                                                    .setCustomId("cancel")
                                                    .setLabel("Cancel Prompt.")
                                                    .setStyle("DANGER"))
        
        
                                        msg1.edit ({
                                            embeds: [datafound],
                                            components: [row]
                                        })


                                            let inv = await db.get(`adverts.users.${interaction.user.id}.groupninv`)


                                            amoguscollector.stop()


                                            const buttonsrow22 = new MessageActionRow()
                                                .addComponents(
                                                    new MessageButton()
                                                        .setStyle('LINK')

                                                        .setLabel('Invite link')
                                                        .setURL(`${inv}`),


                                                )




                                            let grpname = await db.get(`adverts.users.${interaction.user.id}.groupname`)
                                            let grpdesc = await db.get(`adverts.users.${interaction.user.id}.groupdesc`)
                                            let groimg = await db.get(`adverts.users.${interaction.user.id}.groupimg`)



                                            const advertembed = new Discord.MessageEmbed()
                                                .setTitle(`${grpname}`)
                                                .setDescription(`${grpdesc}`)
                                                .setImage(`${groimg}`)
                                                .setColor("#2f3136")
                                            await i.reply({
                                                content: `I have posted the advertisement!`
                                            })
                                            //   await message.channel.send({ embeds: [advertembed], components: [buttonsrow]  })

                                            client.channels.cache.get('890876595626188820').send({
                                                embeds: [advertembed],
                                                components: [buttonsrow22],
                                                content: `Posted by <@${interaction.user.id}>`
                                            })

                                        }
                                        if (i.customId == "new") {
                                            amoguscollector.stop()

                                           

                                            await i.reply({
                                                content: "Creating new advertisement data!"

                                            });
                                            //if user selects cancel then it will delete all saved data so that he can try again 
                                            const test = new Discord.MessageEmbed()

                                    .setTitle("Group name")
                                    .setDescription("What is your group name?")

                                    .setColor("#2f3136")
                                    .setTimestamp()


                                interaction.member.send({
                                    embeds: [test],
                                    fetchReply: true
                                }).then(msg => {


                                    msg.channel.awaitMessages({
                                         time: 5 * 60000,
                                        max: 1,

                                    }).then(message1 => {

                                        let msg1 = message1.first().content
                                        console.log(msg1)
                                        if (msg1.toLowerCase() === "cancel") return interaction.member.send("Ok, I have cancelled this process")

                                        const descriptioncollector = new Discord.MessageEmbed()
                                            .setTitle("Description")
                                            .setDescription("What is your description?")

                                            .setColor("#2f3136")
                                            .setTimestamp()

                                        interaction.member.send({
                                            embeds: [descriptioncollector]
                                        }).then(msg => {

                                            msg.channel.awaitMessages({
                                                time: 5 * 60000,
                                                max: 1
                                            }).then(messages => {
                                                let msg2 = messages.first().content
                                                console.log(msg2)
                                                if (msg2.toLowerCase() === "cancel") return interaction.member.send("Ok, I have cancelled this process")


                                                const invcollection = new Discord.MessageEmbed()
                                                    .setTitle("invite")
                                                    .setDescription("What is your discord invite link?")
                                                    .setColor("#2f3136")
                                                    .setFooter("Must include https://discord.gg/")

                                                    .setTimestamp()

                                                interaction.member.send({
                                                    embeds: [invcollection]
                                                }).then(msg => {

                                                    msg.channel.awaitMessages({
                                                        time: 5 * 60000,
                                                        max: 1
                                                    }).then(messages => {
                                                        let msg3 = messages.first().content
                                                        console.log(msg3)
                                                        if (msg3.toLowerCase() === "cancel") return interaction.member.send("Ok, I have cancelled this process")
                                                        if (msg3.toLowerCase() === "cancel") return interaction.member.send("Ok, I have cancelled this process")
                                                        const imagecollection = new Discord.MessageEmbed()
                                                            .setTitle("Image")
                                                            .setDescription("Please give me an image link.")
                                                            .setFooter('Type "skip" to skip image.')

                                                            .setColor("#2f3136")
                                                            .setTimestamp()

                                                        interaction.member.send({
                                                            embeds: [imagecollection]
                                                        }).then(msg => {

                                                            msg.channel.awaitMessages({
                                                                time: 5 * 60000,
                                                                max: 1
                                                            }).then(async messages => {
                                                                let msg4 = messages.first().content


                                                                if (msg4.toLowerCase() === "cancel") return interaction.member.send("Ok, I have cancelled this process")
                                                                if (msg4.toLowerCase() === "skip") {


                                                                    db.set(`adverts/users/${interaction.member.id}/groupimg`, `${'https://media.discordapp.net/attachments/849989987650764810/897400578861326347/Frame_106.png?width=1440&height=596'}`)

                                                                    const buttonsrow = new MessageActionRow()
                                                                        .addComponents(
                                                                            new MessageButton()
                                                                                .setStyle('SUCCESS')

                                                                                .setLabel('Yes')
                                                                                .setCustomId("post"),

                                                                            new MessageButton()
                                                                                .setStyle('DANGER')
                                                                                .setLabel('No')
                                                                                .setCustomId('nopost'))
                                                                    //saving the data 
                                                                    db.set(`adverts/users/${interaction.member.id}/groupname`, `${msg1}`)
                                                                    db.set(`adverts/users/${interaction.member.id}/groupdesc`, `${msg2}`)

                                                                    db.set(`adverts/users/${interaction.member.id}/groupninv`, `${msg3}`)
                                                                    //geting the saved data, use full for advert embed
                                                                    let grpname = await db.get(`adverts.users.${interaction.member.id}.groupname`)
                                                                    let grpdesc = await db.get(`adverts.users.${interaction.member.id}.groupdesc`)
                                                                    let groimg = await db.get(`adverts.users.${interaction.member.id}.groupimg`)
                                                                    let inv = await db.get(`adverts.users.${interaction.member.id}.groupninv`)


                                                                    const advertembed = new Discord.MessageEmbed()
                                                                        .setTitle(`${grpname}`)
                                                                        .setDescription(`${grpdesc}`)

                                                                        .setImage(groimg)
                                                                        .setColor("#2f3136")

                                                                    interaction.member.send({
                                                                        content: `Would you like use this?`
                                                                    })

                                                                    interaction.member.send({
                                                                        embeds: [advertembed],
                                                                        components: [buttonsrow]
                                                                    }).then(msg => {

                                                                        const confcollector = msg.createMessageComponentCollector({

                                                                        })
                                                                        confcollector.on("collect", async (i) => {

                                                                            if (i.customId == "post") {

                                                                                const buttonsrow11 = new MessageActionRow()
                                                                                    .addComponents(
                                                                                        new MessageButton()
                                                                                            .setStyle('SUCCESS')
                                                                                            .setDisabled(true)
                                                                                            .setLabel('Yes')
                                                                                            .setCustomId("post"),

                                                                                        new MessageButton()
                                                                                            .setStyle('DANGER')
                                                                                            .setLabel('No')
                                                                                            .setDisabled(true)
                                                                                            .setCustomId('nopost'))


                                                                                const advertembed1 = new Discord.MessageEmbed()
                                                                                    .setTitle(`${grpname}`)
                                                                                    .setDescription(`${grpdesc}`)

                                                                                    .setImage(groimg)
                                                                                    .setColor("#2f3136")

                                                                                msg.edit({
                                                                                    embeds: [advertembed1],
                                                                                    components: [buttonsrow11]
                                                                                })

                                                                                let inv1 = await db.get(`adverts.users.${interaction.member.id}.groupninv`)
                                                                                console.log(inv)
                                                                                confcollector.stop()
                                                                                const buttonsrow1212 = new MessageActionRow()
                                                                                    .addComponents(
                                                                                        new MessageButton()
                                                                                            .setStyle('LINK')

                                                                                            .setLabel('Invite link')
                                                                                            .setURL(inv1),


                                                                                    )
                                                                                const advertembed = new Discord.MessageEmbed()
                                                                                    .setTitle(`${grpname}`)
                                                                                    .setDescription(`${grpdesc}`)

                                                                                    .setImage(groimg)
                                                                                    .setColor("#2f3136")

                                                                                const Done = new Discord.MessageEmbed()



                                                                                    .setAuthor("I have posted the advertisement.", "https://images-ext-1.discordapp.net/external/QssUDTEm0jgAt5N_Qj8kzzjJcL53gqfbiloopuh7EPY/https/images-ext-2.discordapp.net/external/Euk4_11WeLVghXuYj50jAqZQhOl_AKIQowNnt4S0yeA/https/media.discordapp.net/attachments/539579135786352652/641188971010850816/627171162857930802.png")
                                                                                    .setColor("#2f3136")
                                                                                    .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                                                                                    .setDescription("I have saved the advertisement, There will be no need to type the advertisement next time!")




                                                                                db.set(`advertisers/users/${interaction.member.id}`, `He did it`)
                                                                                await i.reply({
                                                                                    embeds: [Done]
                                                                                })
                                                                                await client.channels.cache.get('890876595626188820').send({
                                                                                    embeds: [advertembed],
                                                                                    components: [buttonsrow1212],
                                                                                    content: `Posted by <@${interaction.member.id}>`
                                                                                })
                                                                            }
                                                                            if (i.customId == 'nopost') {
                                                                                confcollector.stop()

                                                                                const buttonsrow11 = new MessageActionRow()
                                                                                    .addComponents(
                                                                                        new MessageButton()
                                                                                            .setStyle('SUCCESS')
                                                                                            .setDisabled(true)
                                                                                            .setLabel('Yes')
                                                                                            .setCustomId("post"),

                                                                                        new MessageButton()
                                                                                            .setStyle('DANGER')
                                                                                            .setLabel('No')
                                                                                            .setDisabled(true)
                                                                                            .setCustomId('nopost'))


                                                                                const advertembed1 = new Discord.MessageEmbed()
                                                                                    .setTitle(`${grpname}`)
                                                                                    .setDescription(`${grpdesc}`)

                                                                                    .setImage(groimg)
                                                                                    .setColor("#2f3136")

                                                                                msg.edit({
                                                                                    embeds: [advertembed1],
                                                                                    components: [buttonsrow11]
                                                                                })

                                                                                //if user selects cancel then it will delete all saved data so that he can try again 
                                                                                db.delete(`adverts.users.${interaction.member.id}.groupname`)
                                                                                db.delete(`adverts.users.${interaction.member.id}.groupdesc`)
                                                                                db.delete(`adverts.users.${interaction.member.id}.groupimg`)
                                                                                db.delete(`adverts.users.${interaction.member.id}.groupninv`)

                                                                                const errorembed12 = new Discord.MessageEmbed()
                                                                                    .setAuthor("Cancelled prompt.", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                                                    .setColor("#2f3136")
                                                                                    .setDescription(`try again next time.`)
                                                                                    .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                                                                                    .setFooter(`Powered by Adverto.`)
                                                                                return i.reply({
                                                                                   embeds: [errorembed12]
                                                                                })

                                                                            }
                                                                        })
                                                                    })








                                                                    return
                                                                }
                                                                //image collection
                                                                let imagelinkcollection = messages.first().content
                                                                console.log(imagelinkcollection)
                                                                // saving data in db


                                                                db.set(`adverts/users/${interaction.member.id}/groupname`, `${msg1}`)
                                                                db.set(`adverts/users/${interaction.member.id}/groupdesc`, `${msg2}`)
                                                                db.set(`adverts/users/${interaction.member.id}/groupimg`, `${imagelinkcollection}`)
                                                                db.set(`adverts/users/${interaction.member.id}/groupninv`, `${msg3}`)


                                                                //geting db for embed
                                                                let grpname = await db.get(`adverts.users.${interaction.member.id}.groupname`)
                                                                let grpdesc = await db.get(`adverts.users.${interaction.member.id}.groupdesc`)
                                                                let groimg = await db.get(`adverts.users.${interaction.member.id}.groupimg`)
                                                                let inv = await db.get(`adverts.users.${interaction.member.id}.groupinv`)


                                                                // const buttonsrow212123 = new MessageActionRow()
                                                                //     .addComponents(
                                                                //         new MessageButton()
                                                                //             .setStyle('SUCCESS')   

                                                                //             .setLabel('Yes')   
                                                                //             .setCustomId("post21"),   

                                                                //         new MessageButton()   
                                                                //             .setStyle('DANGER')   
                                                                //             .setLabel('No')   
                                                                //             .setCustomId('nopost12'))   



                                                                // // const slotcomfirm = new Discord.MessageEmbed()

                                                                // // .setTitle('Would you like to save this advertisement in your first slot?')
                                                                // // .setDescription("This advertisiment will be saved in your first slot upon your agreement")
                                                                // // .setFooter('You can post advertisement from this selected slot from next time')
                                                                // .setTimestamp()
                                                                // interaction.member.send({embeds:[slotcomfirm], components: [buttonsrow212123]}).then((msg) => {

                                                                // const confcollector = msg.createMessageComponentCollector({

                                                                // })
                                                                // confcollector.on("collect", async (interaction) => {

                                                                //     if (interaction.customId == "post21") {


                                                                //         const savingdata = new Discord.MessageEmbed()
                                                                //         .setAuthor('Saving Data', 'https://cdn.discordapp.com/emojis/812342403288662046.gif?size=9')
                                                                //         .setDescription('Saving data this might take few seconds ...')

                                                                //         db.set(`Advertise_group_name_slot1_${interaction.member.id}`, `${msg1}`)
                                                                //         db.set(`Advertise_group_des_slot1_${interaction.member.id}`, `${msg2}`)
                                                                //         db.set(`Advertise_group_IMG_slot1_${interaction.member.id}`, `${imagelinkcollection}`)
                                                                //         db.set(`Advertise_group_inv_slot1_${interaction.member.id}`, `${msg3}`)
                                                                //         db.set(`Advertise_slot1_${interaction.member.id}`, `he did it!!!`)
                                                                //         interaction.member.send({embeds: [savingdata]})



                                                                //     }
                                                                // })
                                                                // })




                                                                const buttonsrow = new MessageActionRow()
                                                                    .addComponents(
                                                                        new MessageButton()
                                                                            .setStyle('SUCCESS')

                                                                            .setLabel('Yes')
                                                                            .setCustomId("post"),

                                                                        new MessageButton()
                                                                            .setStyle('DANGER')
                                                                            .setLabel('No')
                                                                            .setCustomId('nopost'))



                                                                const advertembed = new Discord.MessageEmbed()
                                                                    .setTitle(`${grpname}`)
                                                                    .setDescription(`${grpdesc}`)

                                                                    .setImage(groimg)
                                                                    .setColor("#2f3136")

                                                                interaction.member.send({
                                                                    content: `Would you like use this?`
                                                                })
                                                                interaction.member.send({
                                                                    embeds: [advertembed],
                                                                    components: [buttonsrow]
                                                                }).then(msg => {

                                                                    const confcollector = msg.createMessageComponentCollector({

                                                                    })
                                                                    confcollector.on("collect", async (i) => {

                                                                        if (i.customId == "post") {
                                                                            const buttonsrow11 = new MessageActionRow()
                                                                                    .addComponents(
                                                                                        new MessageButton()
                                                                                            .setStyle('SUCCESS')
                                                                                            .setDisabled(true)
                                                                                            .setLabel('Yes')
                                                                                            .setCustomId("post"),

                                                                                        new MessageButton()
                                                                                            .setStyle('DANGER')
                                                                                            .setLabel('No')
                                                                                            .setDisabled(true)
                                                                                            .setCustomId('nopost'))


                                                                                const advertembed1 = new Discord.MessageEmbed()
                                                                                    .setTitle(`${grpname}`)
                                                                                    .setDescription(`${grpdesc}`)

                                                                                    .setImage(groimg)
                                                                                    .setColor("#2f3136")

                                                                                msg.edit({
                                                                                    embeds: [advertembed1],
                                                                                    components: [buttonsrow11]
                                                                                })

                                                                            let inv1 = await db.get(`adverts.users.${interaction.member.id}.groupninv`)
                                                                            console.log(inv)

                                                                            confcollector.stop()
                                                                            const buttonsrow = new MessageActionRow()
                                                                                .addComponents(
                                                                                    new MessageButton()
                                                                                        .setStyle('LINK')

                                                                                        .setLabel('Invite link')
                                                                                        .setURL(inv1),


                                                                                )
                                                                            const advertembed = new Discord.MessageEmbed()
                                                                                .setTitle(`${grpname}`)
                                                                                .setDescription(`${grpdesc}`)

                                                                                .setImage(groimg)
                                                                                .setColor("#2f3136")

                                                                            const Done = new Discord.MessageEmbed()



                                                                                .setAuthor("I have posted the advertisement.", "https://images-ext-1.discordapp.net/external/QssUDTEm0jgAt5N_Qj8kzzjJcL53gqfbiloopuh7EPY/https/images-ext-2.discordapp.net/external/Euk4_11WeLVghXuYj50jAqZQhOl_AKIQowNnt4S0yeA/https/media.discordapp.net/attachments/539579135786352652/641188971010850816/627171162857930802.png")
                                                                                .setColor("#2f3136")
                                                                                .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                                                                                .setDescription("I have saved the advertisement, There will be no need to type the advertisement next time!")


                                                                            // saving data as he previously did advertisement
                                                                            db.set(`advertisers/users/${interaction.member.id}`, `He did it`)
                                                                            await i.reply({
                                                                                embeds: [Done]
                                                                            })
                                                                            await client.channels.cache.get('890876595626188820').send({
                                                                                embeds: [advertembed],
                                                                                components: [buttonsrow],
                                                                                content: `Posted by <@${interaction.user.id}>`
                                                                            })
                                                                        }
                                                                        if (i.customId == 'nopost') {
                                                                            confcollector.stop()


                                                                            const buttonsrow11 = new MessageActionRow()
                                                                            .addComponents(
                                                                                new MessageButton()
                                                                                    .setStyle('SUCCESS')
                                                                                    .setDisabled(true)
                                                                                    .setLabel('Yes')
                                                                                    .setCustomId("post"),

                                                                                new MessageButton()
                                                                                    .setStyle('DANGER')
                                                                                    .setLabel('No')
                                                                                    .setDisabled(true)
                                                                                    .setCustomId('nopost'))


                                                                        const advertembed1 = new Discord.MessageEmbed()
                                                                            .setTitle(`${grpname}`)
                                                                            .setDescription(`${grpdesc}`)

                                                                            .setImage(groimg)
                                                                            .setColor("#2f3136")

                                                                        msg.edit({
                                                                            embeds: [advertembed1],
                                                                            components: [buttonsrow11]
                                                                        })

                                                                            //if user selects cancel then it will delete all saved data so that he can try again 
                                                                            db.delete(`adverts.users.${interaction.member.id}.groupname`)
                                                                            db.delete(`adverts.users.${interaction.member.id}.groupdesc`)
                                                                            db.delete(`adverts.users.${interaction.member.id}.groupimg`)
                                                                            db.delete(`adverts.users.${interaction.member.id}.groupinv`)

                                                                            const errorembed12 = new Discord.MessageEmbed()
                                                                                    .setAuthor("Cancelled prompt.", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                                                    .setColor("#2f3136")
                                                                                    .setDescription(`try again next time.`)
                                                                                    .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                                                                                    .setFooter(`Powered by Adverto.`)
                                                                                return i.reply({
                                                                                   embeds: [errorembed12]
                                                                                })

                                                                        }
                                                                    })
                                                                })




                                                            }).catch((error) => {
                                                                const errorembed = new Discord.MessageEmbed()
                                                                    .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                                    .setColor("#2f3136")
                                                                    .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                                                    .addFields({
                                                                        name: 'Error was ',
                                                                        value: `${error}`
                                                                    })

                                                                    .setTimestamp()
                                                                db.set(`bugs/occured/messagecollection`, `${error}`)
                                                                interaction.member.send({ embeds: [errorembed] })
                                                            });
                                                        }).catch((error) => {
                                                            const errorembed = new Discord.MessageEmbed()
                                                                .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                                .setColor("#2f3136")
                                                                .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                                                .addFields({
                                                                    name: 'Error was ',
                                                                    value: `${error}`
                                                                })

                                                                .setTimestamp()
                                                            db.set(`bugs/occured/messagecollection`, `${error}`)
                                                            interaction.member.send({ embeds: [errorembed] })
                                                        });

                                                    }).catch((error) => {
                                                        const errorembed = new Discord.MessageEmbed()
                                                            .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                            .setColor("#2f3136")
                                                            .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                                            .addFields({
                                                                name: 'Error was ',
                                                                value: `${error}`
                                                            })

                                                            .setTimestamp()
                                                        db.set(`bugs/occured/messagecollection`, `${error}`)
                                                        interaction.member.send({ embeds: [errorembed] })
                                                    });
                                                }).catch((error) => {
                                                    const errorembed = new Discord.MessageEmbed()
                                                        .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                        .setColor("#2f3136")
                                                        .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                                        .addFields({
                                                            name: 'Error was ',
                                                            value: `${error}`
                                                        })

                                                        .setTimestamp()
                                                    db.set(`bugs/occured/messagecollection`, `${error}`)
                                                    interaction.member.send({ embeds: [errorembed] })
                                                });
                                            }).catch((error) => {
                                                const errorembed = new Discord.MessageEmbed()
                                                    .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                    .setColor("#2f3136")
                                                    .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                                    .addFields({
                                                        name: 'Error was ',
                                                        value: `${error}`
                                                    })

                                                    .setTimestamp()
                                                db.set(`bugs/occured/messagecollection`, `${error}`)
                                                interaction.member.send({ embeds: [errorembed] })
                                            });
                                        }).catch((error) => {
                                            const errorembed = new Discord.MessageEmbed()
                                                .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                                .setColor("#2f3136")
                                                .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                                .addFields({
                                                    name: 'Error was ',
                                                    value: `${error}`
                                                })

                                                .setTimestamp()
                                            db.set(`bugs/occured/messagecollection`, `${error}`)
                                            interaction.member.send({ embeds: [errorembed] })
                                        });
                                    }).catch((error) => {
                                        const errorembed = new Discord.MessageEmbed()
                                            .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                            .setColor("#2f3136")
                                            .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                            .addFields({
                                                name: 'Error was ',
                                                value: `${error}`
                                            })

                                            .setTimestamp()
                                        db.set(`bugs/occured/messagecollection`, `${error}`)
                                        interaction.member.send({ embeds: [errorembed] })
                                    });
                                }).catch((error) => {
                                    const errorembed = new Discord.MessageEmbed()
                                        .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                        .setColor("#2f3136")
                                        .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                        .addFields({
                                            name: 'Error was ',
                                            value: `${error}`
                                        })

                                        .setTimestamp()
                                    db.set(`bugs/occured/messagecollection`, `${error}`)
                                    interaction.member.send({ embeds: [errorembed] })
                                });



                                        }

                                        
                       

                                        if (i.customId == "cancel") {

                                            const buttonsrow121221 = new MessageActionRow()
                                            .addComponents(
                                                new MessageButton()
                                                    .setStyle('SUCCESS')
                                                    .setDisabled(true)
                                                    .setLabel('Continue')
                                                    .setCustomId("yos"),
        
                                                new MessageButton()
                                                    .setStyle('DANGER')
                                                    .setLabel('Cancel prompt')
                                                    .setCustomId('nos')
                                                    .setDisabled(true))
        
        
                                      
                                            amoguscollector.stop()
                                            const errorembed1 = new Discord.MessageEmbed()
                                            .setAuthor("Cancelled prompt.", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                            .setColor("#2f3136")
                                            .setDescription(`try again next time.`)
                                            .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                                            .setFooter(`Powered by Adverto.`)

                                            i.reply({embeds : [errorembed1]})
                                            return
                                        }

                                    })
                                })
                            }, 3000)
                        
                            }
                            
                        }).catch((error) => {
                            const errorembed = new Discord.MessageEmbed()
                                .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                                .setColor("#2f3136")
                                .setDescription(`Oops an error occured try again later. I have reported this to our development team.`)
                                .addFields({
                                    name: 'Error was ',
                                    value: `${error}`
                                })

                                .setTimestamp()
                            db.set(`bugs/occured/dberror`, `${error}`)
                            interaction.member.send({ embeds: [errorembed] })
                        });
                    }
                    if (i.customId == 'nos') {

                        const errorembed1 = new Discord.MessageEmbed()
                            .setAuthor("Cancelled prompt.", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                            .setColor("#2f3136")
                            .setDescription(`try again next time.`)
                            .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                            .setFooter(`Powered by Adverto.`)


                        const buttonsrow121221 = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setStyle('SUCCESS')
                                    .setDisabled(true)
                                    .setLabel('Continue')
                                    .setCustomId("yos"),

                                new MessageButton()
                                    .setStyle('DANGER')
                                    .setLabel('Cancel prompt')
                                    .setCustomId('nos')
                                    .setDisabled(true))


                        const cooldown = new Discord.MessageEmbed()
                            .setTitle("Thanks for using Adverto!")
                            .setDescription("We will save your advertisement data in our database so that its easier for you to advertise for next time.")
                            .setTimestamp()
                            .setColor("#2f3136")
                            .setImage("https://cdn.discordapp.com/attachments/879343606924722218/897409517824905243/unknown.png")
                        msg.edit({ embeds: [cooldown], components: [buttonsrow121221] })


                        return i.reply({ embeds: [errorembed1] })
                    }
                })

            })




        } catch (error) {
            //   If message couldn't be sent



            const errorembed = new Discord.MessageEmbed()
                .setAuthor("Unable to send advertisements", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                .setColor("#2f3136")
                .setDescription(`Failed to send advertisement.`)
                .addFields({
                    name: 'Error was ',
                    value: `${error}`
                })
                .setFooter(`Please try again later.`)



            interaction.member.send({ embeds: [errorembed] })

        }
    },
};