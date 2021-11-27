const Discord = require('discord.js'); //get const Disc to communicate with all of our node modules

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const prefix = "-";

const fs = require('fs'); //to get into other js files

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); //check files are js, tells it to go into commands folder
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log('EasyBot is online!');
});

client.on('message', message => {

    //if doesnt start with prefix or if the bot is the author
    if (!message.content.startsWith(prefix) || message.author.bot) return; 

    const args = message.content.slice(prefix.length).split(/ +/); //splicing command so can do say !check wiki
    const command = args.shift().toLowerCase();


    if (command == 'command') {
        client.commands.get('command').execute(message, args, Discord);
    }

    //command handler (for 10-20 commands, need to use separate files for each command if more than 20 commands)
    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
    else if (command=='youtube') {
        client.commands.get('youtube').execute(message, args);
    }
    else if (command=='timer') {
        client.commands.get('timer').execute(message, args);
    }
});



client.login('OTEzMjE3MDA4MDQ3MzkwNzgw.YZ7RnQ.8WgJciDv5xj5kruKhbPncb2_MhE');

