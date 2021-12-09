const profileModel = require('../models/profileSchema');

module.exports = async (client, Discord, message) => {
  const prefix = '-';
  // if doesnt start with prefix or if the bot is the author
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // CHECK IF USER PROFILE EXISTS IN MONGO, OTHERWISE CREATE USER
  let profileData;
  try {
    profileData = await profileModel.findOne({ userID: message.author.id });
    if (!profileData) {
      let profile = await profileModel.create({
        userID: message.author.id,
        serverID: message.guild.id,
        points: 0,
      });
      profile.save();
    }
  } catch (err) {
    console.log(err);
  }

  const args = message.content.slice(prefix.length).split(/ +/); // splicing command to separate arguments
  const command = args.shift().toLowerCase();

  // command handler
  if (command === 'timer') {
    client.commands.get('timer').execute(message, args);
  } else if (command === 'addtestuser') {
    // THIS COMMAND WILL SIMULATE A DISCORD USER JOIN THE SERVER
    client.commands.get('addTestUser').execute(client, message, args);
  } else if (command === 'points') {
    client.commands.get('points').execute(message, args);
  }
};
