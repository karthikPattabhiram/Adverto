require("dotenv").config();
const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const fetch = require('node-fetch');
const emojis = require("../../../utils/emojis");

const wait = require('util').promisify(setTimeout);
const moment = require('moment');
const { db } = require("../../../handler/database");

module.exports = {
    name: "hire",
    description: "test",
    type: 1,
    timeout: 10,

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * @param {Database} db
     */
    
    execute: async (client, interaction,  args) => {

        
    },
};