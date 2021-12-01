const minToMs = (minutes) => {
  return minutes * 60000;
};

const updateTimer = (prevMessage, timeLeft) => {
  if (timeLeft > 0) {
    prevMessage.edit(timeLeft + " minutes remaining");
    setTimeout(() => updateTimer(prevMessage, timeLeft - 1), 60000);
  } else {
    prevMessage.edit("Time's up!");
  }
};

module.exports = {
  name: "timer",
  description:
    "This is a Pomodoro timer command! \
                usage: command WorkTime RestTime",
  execute(message, args) {
    let workTime = 25; // default Pomodoro work timer in minutes
    let restTime = 5;
    if (!isNaN(args[0])) {
      workTime = args[0];
    }
    if (!isNaN(args[1])) {
      restTime = args[1];
    }
    message.channel
      .send(workTime + " minutes remaining")
      .then((sentMessage) => {
        updateTimer(sentMessage, workTime);
      });
  },
};
