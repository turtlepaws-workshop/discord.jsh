const Discord = require("discord.js");
const { MessageButton, MessageActionRow } = Discord;
const EventEmitter = require('node:events');
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v9");
const klawSync = require('klaw-sync');

module.exports = class Client extends EventEmitter {
    /**
     * @typedef ConfigOptions
     * @property {Discord.ColorResolvable|String} [color=null] 
     * @property {String|Discord.Channel} [logCategory=null]
     */

    /**
     * @typedef ClientOptions
     * @property {String} [token=null]
     * @property {String} [clientID=null]
     * @property {String} [testGuildID=null]
     * @property {ConfigOptions} [config={}]
     */

    /**
     * The client constructor.
     * @param {ClientOptions} options
     */
    constructor({ token = null, clientID = null, testGuildID = null, config = {} } = {}) {
        super();
        /**
         * The Discord.js client.
         * @type {Discord.Client}
         */
        this.client = null;

        /**
         * The config for this bot.
         * @type {Object}
         */
        this.config = config || {
            logCategory: null,
            color: null
        };

        /**
         * The bot info.
         * @type {Object}
         */
        this.bot = {
            token: token,
            clientID: clientID,
            testGuildID: testGuildID
        }

        /**
         * All the slash commands.
         */
        this.commands = {
            private: new Discord.Collection(),
            public: new Discord.Collection()
        };

        /**
         * All the context menus.
         */
        this.contextMenus = {
            private: new Discord.Collection(),
            public: new Discord.Collection()
        };

        /**
         * All the events.
         */
        this.events = new Discord.Collection();

        setTimeout(() => {
            this.client.once("ready", () => {
                console.log(`Client Ready as ${this.client.user.tag}! ${this.client.guilds.cache.size} guilds`)
            });
        }, 500)
        setTimeout(() => {
            this.initEvents();
        }, 3000);

    }

    /**
     * @private
     */
    initEvents() {
        this.client.on("interactionCreate", i => {
            if (i.isCommand()) this.emit("command", i);
            else if (i.isContextMenu()) this.emit("contextMenu", i);
            else if (i.isMessageComponent()) this.emit(`component`, i);
            else this.emit(`unknown`, i);
        });
        //Useful shortcuts
        this.client.on("interactionCreate", i => {
            if(i.isMessageComponent()){
                if(i.isButton()){
                    if(i.customId == "jsh_delete") i.message.delete().catch(( ) => { });
                } else if(i.isSelectMenu()){
                    if(i.values.includes("jsh_delete")) i.message.delete().catch(( ) => { });
                }
            }
        })
        this.client.on("interactionCreate", i => {
            if (i.isCommand()) {
                this.commands.public.get(i.commandName)?.execute(i, this.client);
                this.commands.private.get(i.commandName)?.execute(i, this.client);
            } else if (i.isContextMenu()) {
                this.contextMenus.public.get(i.commandName)?.execute(i, this.client);
                this.contextMenus.private.get(i.commandName)?.execute(i, this.client);
            }
        });

        setTimeout(() => {
            /**
             * @type {Discord.CategoryChannel}
             */
            this.logs = this.client.channels.cache.find(e => e.id == this.bot.logCategory && e.type == "GUILD_CATEGORY");
            if (this.logs != null) {
                if (!this.logs.children.find(e => e.name == "commands" && e.type == "GUILD_TEXT")) this.logs.createChannel("commands")
                if (!this.logs.children.find(e => e.name == "errors" && e.type == "GUILD_TEXT")) this.logs.createChannel("errors")
                if (!this.logs.children.find(e => e.name == "other" && e.type == "GUILD_TEXT")) this.logs.createChannel("other")
            }
            for(const event of this.events.values()){
                if (event?.once) {
                    this.client.once(event.name, (...args) => event.execute(...args, this.client));
                } else {
                    this.client.on(event.name, (...args) => event.execute(...args, this.client));
                }
            }
        }, 3000);
    }

    /**
     * Sets your events dir used for events. (Also adds client.events)
     * @param {String} dir 
     */
    setEventsDir(dir = "./events") {
        const events = klawSync(dir, { nodir: true, traverseAll: true, filter: f => f.path.endsWith('.js') })

        for (const file of events) {
            const event = require(`${file.path}`);

            this.events.set(event.name, event);
        }

        return this;
    }

    /**
     * Sets your commands dir used for creating commands. (Also adds client.commands
     * @example ```js
     * const jsh = require("discord.jsh");
     * 
     * const Cmd = module.exports = {
     *      name: "test",
     *      description: "Test command",
     *      //If you use the defualt jsh help command or jsh command getter it will add the usage. TL:DR: You don't need to add `usage`.
     *      async execute(interaction, client) {
     *          await interaction.reply(`Test`);
     *      }
     * }
     * 
     * module.exports.data = new jsh.commandBuilder(Cmd);
     * ```
     * @param {String} dir 
     */
    setCommandsDir(dir = "./commands") {
        const commands = klawSync(dir, { nodir: true, traverseAll: true, filter: f => f.path.endsWith('.js') })

        for (const file of commands) {
            const command = require(`${file.path}`);

            if (command?.devOnly == true) {
                this.commands.private.set(command.name, command);
            } else {
                this.commands.public.set(command.name, command);
            };
        }

        return this;
    }

    /**
 * Sets your commands dir used for creating commands. (Also adds client.commands
 * @example ```js
 * const jsh = require("discord.jsh");
 * 
 * const Cmd = module.exports = {
 *      name: "avatar", //Case sensit
 *      type: "USER",
 *      //If you use the defualt jsh help command or jsh command getter it will add the usage. TL:DR: You don't need to add `usage`.
 *      async execute(interaction, client) {
 *          await interaction.reply(`Test`);
 *      }
 * }
 * 
 * module.exports.data = new jsh.commandBuilder(Cmd);
 * ```
 * @param {String} dir 
 */
    setContextDir(dir = "./context_menus") {
        const menus = klawSync(dir, { nodir: true, traverseAll: true, filter: f => f.path.endsWith('.js') })

        for (const file of menus) {
            const menu = require(`${file.path}`);

            if (menu?.devOnly == true) {
                this.contextMenus.private.set(menu.name, menu);
            } else {
                this.contextMenus.public.set(menu.name, menu);
            };
        }

        return this;
    }

    /**
     * Creates the client.
     * @param {Discord.ClientOptions} options 
     * @returns 
     */
    create(options) {
        this.client = new Discord.Client(options);
        this.client.login(this.bot.token);

        const rest = new REST({ version: '9' }).setToken(this.bot.token);

        const Commands1 = []; //Private
        const Commands2 = []; //Public

        this.commands.private.forEach(e => Commands1.push(e.data.toJSON()))
        this.commands.public.forEach(e => Commands2.push(e.data.toJSON()))
        this.contextMenus.private.forEach(e => Commands1.push(e.data.toJSON()))
        this.contextMenus.public.forEach(e => Commands2.push(e.data.toJSON()))
        
        this.client.commands = this.commands;
        this.client.events = this.events;
        this.client.contextMenus = this.contextMenus

        rest.put(Routes.applicationGuildCommands(this.bot.clientID, this.bot.testGuildID), { body: Commands1 })
            .then((commands) => {
                this.client.rawGuildCommands = commands
                console.log('Successfully registered application commands. (Private)')
            })
            .catch(console.error);

        rest.put(Routes.applicationCommands(this.bot.clientID), { body: Commands2 })
            .then((commands) => {
                this.client.rawCommands = commands
                console.log('Successfully registered application commands. (Public)')
            })
            .catch(console.error);
        return this.client;
    }
}