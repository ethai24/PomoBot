const minToMs = (minutes) => {
  return minutes * 60000;
};

// delay next function call for t ms
const delay = ms => new Promise((resolve, reject) => setTimeout(() => resolve, ms));

// will send message and edit time left every minute
const printTimeRemaining = (sentMessage, time) => {
  const updateTimer = (timeLeft) => new Promise(resolve => {
    if (timeLeft > 0) {
      setTimeout(()=> {
        timeLeft--;
        sentMessage.edit(sentMessage["content"].replace(/(\d.)*\d+$/, "") + timeLeft);
        updateTimer(timeLeft).then(resolve());
      }, 5000);
    } else {
      resolve(sentMessage.edit(sentMessage["content"].replace(/(\d.)*\d+$/, "0")));
    }
  });
  return updateTimer(time);
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
    
    message.channel.send("Working minutes remaining: " + workTime).then((workMessage) => 
    printTimeRemaining(workMessage, workTime));
    //.then(()=>message.channel.send("Time for a break!"));
    // let breakMessage = message.channel.send("Break minutes remaining: " + restTime)
    // await updateTimer(breakMessage, restTime);
    //  message.channel.send("Congrats, you've earned " + workTime * 100 + " points!!");
  },
};
