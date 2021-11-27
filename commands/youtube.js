module.exports = {
    name: 'youtube',
    description: "send youtube link",
    execute(message, args){
        message.channel.send('https://www.youtube.com');
    }
}