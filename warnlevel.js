const Disocrd = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have access to this.");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("Ne namiram takuv user");
    let warnlevel = warns[wUser.id].warns;

    message.reply(`<@${wUser.id}> have ${warnlevel} warns.`)

}

module.exports.help= {
    name: "warnlevel"
}
