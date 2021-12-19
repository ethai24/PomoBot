const profileModel = require('../models/profileSchema');

const getPoints = async (n) => {
  return await profileModel.find().sort({ points: -1 }).limit(n);
};

module.exports = {
  name: 'display',
  description: 'This command displays the top users points',
  execute(message, args) {
    let numberUsersToDisplay = parseInt(args[0]);
    if (isNaN(numberUsersToDisplay)) {
      numberUsersToDisplay = 5;
    }

    getPoints(numberUsersToDisplay)
      .then((topUsers) => {
        message.channel.send('LEADERBOARDS');
        topUsers.forEach((user, index) => {
          message.channel.send(
            index + 1 + '. <@' + user.userID + '> - ' + user.points,
          );
        });
      })
      .catch((err) => console.log(err));
  },
};
