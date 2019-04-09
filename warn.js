const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
const errors = require ("../utils/errors.js")

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("Ne namiram takuv user");
    if(wUser.hasPermission("ADMINISTRATOR")) return errors.noPerms(message, "ADMINISTRATOR");
    let reason = args.join(" ").slice(22);

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log (err);
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warns")
    .setAuthor(message.author.username)
    .setColor("#f44242")
    .addField("Warn-atiqt User", `<@${wUser.id}>`)
    .addField("Warnat v", message.channel)
    .addField("Chislo na warn-ove", warns[wUser.id].warns)
    .addField("Reason", reason);

    let warnchannel = message.guild.channels.find(`name`, "warns");
    if(!warnchannel) return nessage,reply("Ne namerih kanala");

    warnchannel.send(warnEmbed);

    if(warns[wUser.id].warns == 2){
        channel.send("Vnimavai poveche! na 2 warn shte budesh mutnat za 30 minuti!"`<@${User.name}>`)

    }
    if(warns[wUser.id].warns == 2){
        let muterole = message.guild.roles.find(`name`, "muted");
        if(!muterole) return message.reply("Purvo trqbva da suzdadesh rolqta")


        setTimeout(function(){
            wUser.removeRole(muterole.id)
            message.channel.reply(`Te bqha unmute-nati`)
        })
    }
    if(warns[wUser.id].warns == 3){
        messages.guild.member(wUser).ban(reason);
        message.channel.send(`${wUser.tag} beshe bannat.`)
        
    }

}

module.exports.help = {
    name: "warn"
}
