const minToMs = (minutes) => {
  return minutes * 60000;
};

// will send message and edit time left every minute
const updateTimer = async (sentMessage, timeLeft) => {
  if (timeLeft > 0) {
    // delete trailing number and decimal
    sentMessage.edit(sentMessage["content"].replace(/(\d.)*\d+$/, "") + timeLeft);
    return setTimeout(() => updateTimer(sentMessage, timeLeft - 1), minToMs(1));
  } else {
    sentMessage.edit(sentMessage["content"].replace(/(\d.)*\d+$/, "0"));
  }
};

module.exports = {
  name: "timer",
  description:
    "This is a Pomodoro timer command! \
                usage: -timer WorkTime RestTime",
  execute(message, args) {
    let workTime = 25; // default Pomodoro work timer in minutes
    let restTime = 5;
    if (!isNaN(args[0])) {
      workTime = args[0];
    }
    if (!isNaN(args[1])) {
      restTime = args[1];
    }
    message.channel.send("Working minutes remaining: " + workTime)
      .then((sentMessage) => {
        updateTimer(sentMessage, workTime)
      .then(() => {
        message.channel.send("Time for a break!");
        message.channel.send("Break minutes remaining: " + restTime)
      .then((sentMessage) => updateTimer(sentMessage, restTime)
      .then(() => message.channel.send("Congrats, you've earned " + workTime * 100 + " points!!")));
      });
    });
  },
};
