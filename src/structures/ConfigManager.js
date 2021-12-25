const Discord = require("discord.js");
const fs = require("fs");

module.exports = class ClientConfigOptions {
    constructor(){
        /**
         * The basic config options for the bot.
         * @type {Object}
         */
        this.options = {
            categoryID: null,
            color: null
        }
    }

    /**
     * Sets the log category. (We will create channels for you if you set this)
     * *NOTE: We will never use this data*
     * @param {String} categoryID 
     * @returns {ClientConfigOptions}
     */
    setLogCategory(categoryID){
        this.options.categoryID = categoryID
        return this;
    }

    /**
     * Sets the bot color used for sending util stuff and replying using `return`.
     * *NOTE: We will never use this data*
     * @param {Discord.ColorResolvable} clientID
     * @returns {ClientConfigOptions}
     */
    setClientID(clientID){
        this.options.clientID = clientID
        return this;
    }
}