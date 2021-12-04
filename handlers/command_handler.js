const fs = require('fs');

module.exports = (client, Discord) => {
    //check files are js, tells it to go into commands folder
    const commandFiles = fs.readdirSync("../commands/")
      .filter((file) => file.endsWith(".js")); 

    // add all commands to from commands folder to bot
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        client.commands.set(command.name, command);
    }
}