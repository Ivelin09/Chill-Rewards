const Discord = require('discord.js');


module.exports.run = async (bot, message ,args) => {

    let m = await message.channel.send('Pinging...')
        let ping = m.createdTimestamp - message.createdTimestamp
        let choices = ["Tova naistina li e ping-a mi","Dobre li e? ne moga da vidq","nadqvam se da e dobre"]
        let response = choices[Math.floor(Math.random() * choices.lentgh)]

        m.edit(`${response}: Bot Latency: \`${ping}\`, API Latency: \`${Math.round(bot.ping)}\``)
    }


module.exports.help = {
    name: "ping"
}
