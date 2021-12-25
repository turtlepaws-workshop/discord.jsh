const Client = require("./classes/client");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { pages, ContextMenuBuilder } = require("discord.js-util");

module.exports.Client = Client;
module.exports.commandBuilder = SlashCommandBuilder;
module.exports.Pages = pages;
module.exports.contextBuilder = ContextMenuBuilder;