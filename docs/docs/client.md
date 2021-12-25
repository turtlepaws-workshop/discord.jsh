## Pages
### EXAMPLE
PARAMETER | TYPE | OPTIONAL | DEFAULT | DESCRIPTION
------ | ------ | ------ | ------ | ------
token | String | false | None | The token used for `client.login`.
clientID | String | false | None | The client ID used for creating commands.
testGuildID | String | true | None | The testing guild ID for commands with the `devOnly` tag.
config | [ClientConfigOptions](docs/ClientConfigOptions) | true | None | The client config options used for sending messages.

```js
new jsh.Client({
    token: "NzkyNzE1NDU0MTk2MDg4ODQy.X-hvzA.Ovy4MCQywSkoMRRclStW4xAYK7I",
    cliendID: "123456789012345678",
    testGuildID: "876543210987654321",
    config: {
        color: "#7289da" //Old blurple color
    }
})
.create()
```
### METHODS
#### .setCommandsDir
Sets the commands directory.

PARAMETER | TYPE | OPTIONAL | DEFAULT | DESCRIPTION
------ | ------ | ------ | ------ | ------
dir | String | true | `./commands` | The directory where all the commands are.
```js
.setCommandsDir();
```
#### .setContextDir
Sets the context menu directory.

PARAMETER | TYPE | OPTIONAL | DEFAULT | DESCRIPTION
------ | ------ | ------ | ------ | ------
dir | String | true | `./context_menus` | The directory where all the context menus are.

```js
.setContextDir();
```
#### .create
Creates the client.

PARAMETER | TYPE | OPTIONAL | DEFAULT | DESCRIPTION
------ | ------ | ------ | ------ | ------
options | [Discord.ClientOptions](https://discord.js.org/#/docs/main/stable/typedef/ClientOptions) | true | None | Options for a client.

```js
.create();
```