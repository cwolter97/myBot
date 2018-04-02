const Discord = require("discord.js");
//const logger = require('winston');
//const botSettings = require("./settings.json");



const prefix = "!";

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`Bot is ready! ${bot.user.username}`);

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }

});

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];

    if(!command.startsWith(prefix)) return;

    function searchYoutube(query){

    }

    switch(command) {

        case `${prefix}youtube`:
          const voiceChannel = message.member.voiceChannel;
          const ytdl = require('ytdl-core');
          const streamOptions = { seek: 0, volume: .5 };

          let query = command.substring(prefix + 1, command.length)

          var request = require("request");

          var options = { method: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search',
            qs:
             {
               'maxResults': '1',
               'part': 'snippet',
               'q': query,
               'type': 'video'
             }
          }

          console.log("Making request");

          request(options, function (error, response, body) {
            console.log(body);
            let jsonResponse = JSON.parse(body);
            console.log('==============');
            console.log(body);
          }

          console.log("joining channel...");

          voiceChannel.join()
            .then(connection => {
              const stream = ytdl('https://www.youtube.com/watch?v=vjUqUVrXclE', { filter : 'audioonly' });
              const dispatcher = connection.playStream(stream, streamOptions);
            })
            .catch(console.error);
          break;

        case `${prefix}spotify`:
            message.channel.send("In Development");
            break;

    }
});


bot.login(process.env.token);
