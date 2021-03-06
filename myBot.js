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

    //returns back top video id result
    function searchYoutube(query){

    }

    switch(command) {

        case `${prefix}youtube`:
          const voiceChannel = message.member.voiceChannel;
          const ytdl = require('ytdl-core');
          const streamOptions = { seek: 0, volume: .5 };

          let query = message.content.substring(prefix + 1, message.content.length)

          console.log("Making request");

          const yt_api_key = process.env.youtube_api;

          var request = require("request");

          var options = { method: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search',
            qs:
             {
               'maxResults': '1',
               'part': 'snippet',
               'q': query,
               'type': 'video',
               'key': yt_api_key
             }
          }
          //default vals
          var video_id = "vjUqUVrXclE";
          var video_title = "ayy thats pretty good"

          //make request for stuff
          request(options, function (error, response, body) {
            let jsonResponse = JSON.parse(body);
            //console.log(body);
            video_id = jsonResponse.items[0].id.videoId;
            video_title = jsonResponse.items[0].snippet.title;

            voiceChannel.join()
              .then(connection => {
                const stream = ytdl('https://www.youtube.com/watch?v=' + video_id, { filter : 'audioonly' });
                //message.channel.send(message.author.username + " requested: " + video_title);
                let embed = new Discord.RichEmbed()
                    //.setAuthor(message.author.usernam)
                    .setDescription(message.author.username + " Has Requested: ")
                    .setColor("#9B59B6")
                    .addField("Video", video_title)

                message.channel.send(embed);

                const dispatcher = connection.playStream(stream, streamOptions);
              })
              .catch(console.error);
          })


          break;

        case `${prefix}novoice`:
            message.channel.send("In Development");
            break;

        case `${prefix}spotify`:
            message.channel.send("In Development");
            break;

    }
});


bot.login(process.env.token);
