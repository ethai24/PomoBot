const profileModel = require('../models/profileSchema');

const getUserPoints = async (userID) => {
  return await profileModel.findOne({ userID: userID });
};

module.exports = {
  name: 'points',
  description: 'This command displays user points',
  execute(message, args) {
    getUserPoints(message.author.id)
      .then((profile) =>
        message.channel.send(
          'User' + profile.userID + ' has ' + profile.points + ' points',
        ),
      )
      .catch((err) => console.log(err));
  },
};
