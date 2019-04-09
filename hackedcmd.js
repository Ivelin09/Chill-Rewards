const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  message.channel.send("Hacking...")
  .then(m => {
      setTimeout(() => m.edit("Hacked!"), 5000);
  });
}
module.exports.help = {
  name: 'hackcmd'
}
