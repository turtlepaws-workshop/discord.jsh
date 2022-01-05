# Command Examples
## Create a simple `/test` command and reply with `test`.

```js
const jsh = require("discord.jsh");

const Cmd = module.exports = {
     name: "test",
     description: "Test command",
     //If you use the defualt jsh help command or jsh command getter it will add the usage. 
     //**TL:DR: You don't need to add `usage`.**
     async execute(interaction, client) {
         //Reply with test and make it ephemeral
         await interaction.reply({ content: `Test`, ephemeral: true });
     }
}

module.exports.data = new jsh.commandBuilder(Cmd);
```



## Command Builder
### ⭐ This uses the `@discordjs/builders` command builder.
### **⚠️ You do not need to use `.toJSON()` jsh will do it for you!**
```js
const jsh = require("discord.jsh");

//With object
new jsh.commandBuilder({
    name: `test`,
    description: `test command`
}).toJSON(); //Returns it to json

//Builder
new jsh.commandBuilder()
.setName(`test`)
.setDescription(`test command`)
.toJSON(); //Returns it to json
```

## Context Builder
### ⭐ This uses the `discord.js-util` context menu builder.
```js
const jsh = require("discord.jsh");

//With object
new jsh.contextBuilder({
    name: "Avatar",
    type: "USER"
}).toJSON();

//Builder
new jsh.contextBuilder()
.setName("Avatar")
.setType("USER")
.toJSON();
```

## Event
```js
const Discord = require("discord.js");
const jsh = require("discordjsh");

module.exports = {
	name: jsh.Events.interactionCreate,
    /**
     * Executes the event.
     * @param {Discord.Client} client 
     * @param {Discord.interaction} message 
     */
	async execute(i, client) {
        if(!i.isButton()) return
        if(i.customId == "hello"){
            i.reply("Hello!");
        }
	},
};
```