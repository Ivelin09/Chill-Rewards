const Discord = require("discord.js");
const botconfig = require("../botconfig");
let purple = botconfig.purple;
let xp = require("../xp.json");
const bot = new Discord.Client();

bot.on('message', async message => {
let level = message.guild.roles.find


module.exports.run = async (bot, message, args) => {

  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     level: 1
  };
}
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvlXp = curlvl * 300;
  let difference = nxtLvlXp - curxp;

  let sicon = message.guild.iconURL;
  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#adf442")
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .setFooter(`${difference} XP Dokato level up-ne`, message.author.displayAvatarURL)
  .setThumbnail(sicon);
  

  message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});

}


if(level[wUser.id].level == 5){
  let level = message.guild.roles.find(`name`, "Active");
  if(!level) return message.reply("Purvo trqbva da suzdadesh rolqta")
}

})

module.exports.help = {
  name: "level"
}
