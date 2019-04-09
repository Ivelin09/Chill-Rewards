const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 2;

{
  owner: '415057593170657293'
}
  
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Nemojah da namerq komandata.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {

  console.log(`${bot.user.username} e online v ${bot.guilds.size} server-a!`);
  bot.user.setActivity("Chill Rewards's server", {type: "Watching"});

});


bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }


  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor("#41f4f4")
    .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });
  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("Trqbva da izchakash 5 sekundi mejdu komandite.")
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }


  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

  if(cmd === `${prefix}reports`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed("string1", "string2")
    .setTitle("```What's new?```")
    .addField(`We have new command which u can use to report a user.Its anonymous! The moment u send it its going to be deleted by itself then the message will send to one staff channel where we can see it.`,`The usage of the command is -report @the name of the user (reason)`)
    .setDescription("@everyone")
    .setColor("#2aeafc")
    .setThumbnail(sicon);



    return message.channel.send(serverembed);
}
if(cmd === `${prefix}happybirthday`){
let sicon = message.guild.iconURL;
let serverembed = new Discord.RichEmbed("string1", "string2")
.setTitle("```Happy birthday!```")
.addField(`I wish u for ur birthday everything that you want to come true!`,` @BIRTHDAYTODAY!!!#0877`)
.setColor("#2aeafc")
.setThumbnail(sicon);


return message.channel.send(serverembed);
}
});

bot.on('guildMemberAdd', (member) => {
  let guild = member.guild;
  let defaultChannel = member.guild.channels.find(ch => ch.name === 'welcome');
  let sicon = member.user.avatarURL;
  if(defaultChannel){
    let embed = new Discord.RichEmbed()
    .setTitle("Welcome")
    .setDescription(`Welcome ${member.user} to our Discord Server!`)
    .addField("Created On",  member.user.createdAt)
    .setThumbnail(sicon)
    .setTimestamp()
    .setColor("#42f46e")
    defaultChannel.send(embed);
  }
});

bot.on('message', async message => {
  if(message.content.startsWith("blackdragon")) {
  message.author.send('e autist')
  } 
  });

bot.login(process.env.BOT_TOKEN);
