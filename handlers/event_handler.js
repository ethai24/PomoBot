const fs = require('fs');

module.exports = (client, Discord) => {
    //check files are js, tells it to go into events folder
    const eventFiles = fs.readdirSync(`./events/`)
      .filter((file) => file.endsWith(".js")); 

    // add all events from events folder to bot
    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client, Discord));
    }
}