const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!args[2]) return message.reply("Napishi cqla komanda!");
    let replies = ["Yes.","No.","I don't know", "Ask again later.", "Probably","Never", "Always", "most likely"];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(1).join(" ");

    let sicon = message.guild.iconURL;
    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#22893f")
    .setThumbnail(sicon)
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.channel.send(ballembed);

}

module.exports.help = {
    name:"8ball"
}
