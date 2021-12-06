const profileModel = require('../models/profileSchema');

module.exports = async (client, Discord, member) => {
  console.log('NEW MEMBER');
  let profile = await profileModel.create({
    userID: member.id,
    serverID: member.guild.id,
    points: 0,
  });
  console.log(profile);
  profile.save();
};
