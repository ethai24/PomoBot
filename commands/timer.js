module.exports = {
    name: 'timer',
    description: "this is a timer command!",
    execute(message, args){
        message.channel.send('Starting Timer for 25 Minutes');
        setTimeout(()=> message.channel.send('Timesup'), 5000);
    }
}