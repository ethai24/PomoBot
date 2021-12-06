const Discord = require('discord.js');
const mongoose = require('mongoose');
const { token, MongoDB } = require('./token.js');

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

client.login(token);

mongoose
  .connect(MongoDB.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log(err);
  });
