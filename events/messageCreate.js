module.exports = (client, Discord, message) => {
    const prefix = "-";
    //if doesnt start with prefix or if the bot is the author
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/); //splicing command to separate arguments
    const command = args.shift().toLowerCase();
    
    //command handler (for 10-20 commands, need to use separate files for each command if more than 20 commands)
    if (command == "timer") {
        client.commands.get("timer").execute(message, args);
    }
}