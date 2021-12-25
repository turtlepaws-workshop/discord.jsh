const Discord = require("discord.js");
const fs = require("fs");

module.exports = class ClientOptionsManager {
    constructor(){
        /**
         * The basic config options for the bot.
         * @type {Object}
         */
        this.options = {
            token: null,
            clientID: null,
            testGuildID: null
        }
    }

    /**
     * Sets the bot token used to log in.
     * *NOTE: We will never use this data*
     * @param {String} token 
     * @returns {ClientOptionsManager}
     */
    setToken(token){
        this.options.token = token
        return this;
    }

    /**
     * Sets the bot clientID used to create commands.
     * *NOTE: We will never use this data*
     * @param {String} token 
     * @returns {ClientOptionsManager}
     */
    setClientID(clientID){
        this.options.clientID = clientID
        return this;
    }

    /**
     * Sets the test guild ID used for the dev bot/dev only tag.
     * *NOTE: We will never use this data*
     * @param {String} token 
     * @returns {ClientOptionsManager}
     */
    setTestGuild(guildID){
        this.options.testGuildID = guildID
        return this;
    }

    /**
     * Saves the values.
     */
    save(){
       
    }

    get ClientID(){
        return this.options.clientID
    }

    get GuildID(){
        return this.options.testGuildID
    }

    get Token(){
        return this.options.token
    }
}