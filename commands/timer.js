const profileModel = require('../models/profileSchema');

const minToMs = (minutes) => {
  return minutes * 60000;
};

// will edit message every minute
const updateTimer = (sentMessage, timeLeft) =>
  new Promise((resolve) => {
    if (timeLeft > 0) {
      setTimeout(() => {
        timeLeft--;
        //REGEX TO REMOVE LAST DIGIT OF MESSAGE and REPLACE WITH
        sentMessage.edit(
          sentMessage['content'].replace(/(\d.)*\d+$/, timeLeft),
        );
        resolve(updateTimer(sentMessage, timeLeft));
      }, minToMs(1));
    } else {
      resolve(
        sentMessage.edit(sentMessage['content'].replace(/(\d.)*\d+$/, '0')),
      );
    }
  });

const updateUserPoints = (userID, workMinutes) => {
  return profileModel.updateOne(
    { userID: userID },
    { $inc: { points: workMinutes * 100 } },
  );
};

module.exports = {
  name: 'timer',
  description:
    'This is a Pomodoro timer command! \
                usage: -timer WorkTime RestTime',
  execute(message, args) {
    let workTime = 25; // default Pomodoro work timer in minutes
    let restTime = 5;
    // if first argument is a number
    if (!isNaN(args[0])) {
      workTime = args[0];
    }
    // if second argument is a number
    if (!isNaN(args[1])) {
      restTime = args[1];
    }
    // prettier-ignore
    message.channel.send('Working minutes remaining: ' + workTime)
    .then((workMessage) => updateTimer(workMessage, workTime)
    .then(() => message.channel.send('Time for a break!')
    .then(message.channel.send('Break minutes remaining: ' + restTime)
    .then((restMessage) => updateTimer(restMessage, restTime)
    .then(() => updateUserPoints(message.author.id, workTime)
      .then(() => message.channel.send("Congrats, you've earned " +workTime * 100 + ' points!!'))
      .catch((err) => console.log(err))
    )))));
  },
};
