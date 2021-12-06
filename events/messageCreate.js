module.exports = (client, Discord, message) => {
  const prefix = '-';
  // if doesnt start with prefix or if the bot is the author
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/); // splicing command to separate arguments
  const command = args.shift().toLowerCase();

  // command handler
  if (command === 'timer') {
    client.commands.get('timer').execute(message, args);
  } else if (command === 'addTestUser') {
    client.commands.get('addTestUser').execute(client, message, args);
  }
};
