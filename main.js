const Discord = require("discord.js"); //get const Disc to communicate with all of our node modules
const fs = require("fs"); //to get into other js files
const { token, MongoDB } = require("./token.js");
const mongoose = require("mongoose");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBER_ADD"] });
const prefix = "-";

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js")); //check files are js, tells it to go into commands folder

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("EasyBot is online!");
});

client.on("messageCreate", (message) => {
  //if doesnt start with prefix or if the bot is the author
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/); //splicing command to separate arguments
  const command = args.shift().toLowerCase();

  //command handler (for 10-20 commands, need to use separate files for each command if more than 20 commands)
  if (command == "timer") {
    client.commands.get("timer").execute(message, args);
  }
});

client.login(token);

mongoose
  .connect(MongoDB.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log(err);
  });
