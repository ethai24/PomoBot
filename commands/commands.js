module.exports = {
    name: 'command',
    description: "Embeds!",
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle('Rules')
        .setDescription('This is an embed for the server rules')
        .addFields(
            {name: 'Rule 1', value: 'Love IU'},
            {name: 'Rule 2', value: 'Drink water'}

        )
        .setImage('https://c4.wallpaperflare.com/wallpaper/871/166/362/iu-wallpaper-preview.jpg')
        .setFooter('Make sure to check out the rules channel');
        message.channel.send({embeds:[newEmbed]});
    }
}