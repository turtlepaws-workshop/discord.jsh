const Client = require("./classes/client");
const DJSBuilders = require("@discordjs/builders");
const { pages, ContextMenuBuilder } = require("discord.js-util");

module.exports.Client = Client;
module.exports.commandBuilder = DJSBuilders.SlashCommandBuilder;
module.exports.Pages = pages;
module.exports.contextBuilder = ContextMenuBuilder;
module.exports.DocsJSON = require("../docs.json");