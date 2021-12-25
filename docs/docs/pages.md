## Pages
### EXAMPLE
PARAMETER | TYPE | OPTIONAL | DEFAULT | DESCRIPTION
------ | ------ | ------ | ------ | ------
pages | Discord.MessageEmbed[] | True | None | The pages for the embed.

```js
new jsh.Pages()
.setInteraction(interaction) //Command interaction or component interaction
.setPages([
    new Discord.MessageEmbed()
    .setTitle("Page 1")
    .setColor("RANDOM"),
    new Discord.MessageEmbed()
    .setTitle("Page 2")
    .setColor("RANDOM")
]) //Array of Discord MessageEmbeds
.setEmojis("⬅️", "➡️") //Back emoji, foward emoji
.send() //Replys to the interaction or edits the interaction;
```
### METHODS
#### .setInteraction
Sets the interaction for the pages.

PARAMETER | TYPE | OPTIONAL | DEFAULT | DESCRIPTION
------ | ------ | ------ | ------ | ------
interaction | Discord.Interaction | false | None | The interaction for the pages. This can be *any* type of interaction.

```js
.setInteraction(interaction)
```
#### .setPages
Sets the interaction for the pages.

PARAMETER | TYPE | OPTIONAL | DEFAULT | DESCRIPTION
------ | ------ | ------ | ------ | ------
pages | Discord.MessageEmbed[] | false | None | An array of embeds.

```js
.setPages([
    new Discord.MessageEmbed()
    .setTitle("Page 1")
    .setColor("RANDOM"),
    new Discord.MessageEmbed()
    .setTitle("Page 2")
    .setColor("RANDOM")
])
```
#### .setEmojis
Sets the emojis buttons.

PARAMETER | TYPE | OPTIONAL | DEFAULT | DESCRIPTION
------ | ------ | ------ | ------ | ------
emoji1 | String | false | None | The back emoji.
emoji2 | String | false | None | The forward emoji.

```js
//Unicode emojis
.setEmojis("⬅️", "➡️")
//Custom emojis
.setEmojis("<:npm_minus:853102825960505344>", "<:npm_plus:853104426112516126>")
```
#### .send
Sets the interaction for the pages.

PARAMETER | TYPE | OPTIONAL | DEFAULT | DESCRIPTION
------ | ------ | ------ | ------ | ------
ephemeral | Boolean | true | false | Whether the reply should be ephemeral/hidden.
```js
.send({ ephemeral: true })
```