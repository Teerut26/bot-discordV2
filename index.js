const Discord = require("discord.js");
const {
    prefix,
    token
} = require("./config.json");
const ytdl = require("ytdl-core");
const axios = require('axios');

var fs = require("fs");
const client = new Discord.Client();

var queue = new Map();
var modules_basic = require('./modules_basic.js')
var modules_embeds = require('./modules_embeds.js')
var modules_web = require('./modules_web.js')
require('./modules_web.js')
// const modules_player = require('./modules_player')

// var obj_log = JSON.parse(log_json); 
// var txt = log_json
// var obj = JSON.parse(txt);
// console.log(obj);

fs.readFile('./log.json', function (err, data) {
    console.log(data);
});

async function getVideoLink(keyWord) {
    if (keyWord.match(/ht.*?\/\//g)) {
        return keyWord
    } else {
        const response = await axios.get('https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=' + encodeURIComponent(keyWord) + '&type=video&key=AIzaSyBLptVtxSxpl3q6gTULHyKRPxy_TSInQFk')
        return "https://www.youtube.com/watch?v=" + response.data.items[0].id.videoId
    }
}

// console.log(client.uptime);



client.on("ready", () => {
    console.log("Ready!");





    type_bot = ['WATCHING', 'PLAYING', 'LISTENING']
    text_activity = ['Porn Hub', 'PUBG', 'Spotify']
    client.user.setActivity('SynthX | /help', {
        type: 'LISTENING'
    })
    // i = 0
    // setInterval(() => {
    //     client.user.setActivity(text_activity[i], {
    //         type: type_bot[i]
    //     })
    //     // console.log('Bot Status : '+type_bot[i])
    //     if (i == 2) {
    //         i = 0
    //     } else {
    //         i++
    //     }
    // }, 1000 * 60 * 60)
});



client.once("reconnecting", () => {
    console.log("Reconnecting!");
});

client.once("disconnect", () => {
    console.log("Disconnect!");
});

client.on("message", async message => {
    // jsonLog.push(message.content)
    // console.log(jsonLog);

    //     let default_time = new Date().toLocaleString("en-US", {timeZone: "Asia/Bangkok"});
    //     let now = new Date(default_time)
    //     let now2 = Date.now();
    //     cotent_text = `{
    //     "time":"${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}",
    //     "time_unix":${now2},
    //     "server_name":"${message.guild.name}",
    //     "server_id":${message.guild.id},
    //     "channel_name":"${message.channel.name}",
    //     "channel_id":${message.channel.id},
    //     "author_username":"${message.author.username}",
    //     "author_id":${message.author.id},
    //     "content":"${message.content}"
    // },\n`
    //     await fs.appendFile('log.txt', cotent_text, function (err) {
    //         if (err) throw err;
    //         console.log('Saved!');
    //     });

    //[${message.guild.name}][${message.channel.name}][${message.author.username}] ${JSON.stringify(message.content)}\n`, function (err) {
    // message.guild.fetchAuditLogs()
    //   .then(audit => console.log(audit.entries.first()))
    //   .catch(console.error);
    // var widget_enabled;
    // await message.guild.fetchWidget().then(function (widget) {
    //         widget_enabled = widget.enabled
    //     })
    //     .catch(console.error);

    // console.log(widget_enabled)

    // await message.guild.edit({
    //     name: message.content,
    //   })
    //     .then(updated => console.log(`New guild name ${updated} in region`))
    //     .catch(console.error);
    // await console.log(queue.get(message.guild.id))
    let default_time = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Bangkok"
    });
    let now = new Date(default_time)

    await fs.appendFile('log.txt', `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}][${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}][${message.guild.name}][${message.channel.name}][${message.author.username}] ${JSON.stringify(message.content)}\n`, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const serverQueue = queue.get(message.guild.id);

    if (message.content.startsWith(`${prefix}play`)) {
        execute(message, serverQueue);
        return;
    } else if (message.content.startsWith(`${prefix}skip`)) {
        skip(message, serverQueue);
        return;
    } else if (message.content.startsWith(`${prefix}stop`)) {
        stop(message, serverQueue);
        return;
    } else if (message.content.startsWith(`${prefix}musiclist`)) {
        getMusicList(message)
        return;
    } else if (message.content.startsWith(`${prefix}help`)) {
        message.channel.send(
            'คำสั่ง\n' +
            // ':musical_note:\n' +
            '/play <YOUTUBE URL>\n' +
            '/skip\n' +
            '/stop\n' +
            // ':loudspeaker:\n' +
            '/google <ISO-3166-code> <word>\n' +
            '/google <word>\n' +
            // ':radioactive:\n' +
            '/covid\n' +
            // ':hash:\n' +
            '/twitter [now][1d][7d][30d][year]\n' +
            '/botv\n' +
            '/musiclist\n' +
            '/useronline\n'
        );

    } else if (message.content.startsWith(`${prefix}covid`)) {
        axios.get('https://covid19.th-stat.com/api/open/today').then((res) => {
            message.channel.send(modules_embeds.embeds_covid(res.data));
            // message.channel.send(
            //     'Confirmed : ' + modules_basic.commaSeparateNumber(res.data.Confirmed) + '\n' +
            //     'Recovered : ' + modules_basic.commaSeparateNumber(res.data.Recovered) + '\n' +
            //     'Hospitalized : ' + modules_basic.commaSeparateNumber(res.data.Hospitalized) + '\n' +
            //     'Deaths : ' + modules_basic.commaSeparateNumber(res.data.Deaths) + '\n' +
            //     'NewConfirmed : ' + modules_basic.commaSeparateNumber(res.data.NewConfirmed) + '\n' +
            //     'NewRecovered : ' + modules_basic.commaSeparateNumber(res.data.NewRecovered) + '\n' +
            //     'NewHospitalized : ' + modules_basic.commaSeparateNumber(res.data.NewHospitalized) + '\n' +
            //     'NewDeaths : ' + modules_basic.commaSeparateNumber(res.data.NewDeaths) + '\n' +
            //     'UpdateDate : ' + res.data.UpdateDate + '\n'
            // );
        }).catch(function (error) {
            console.log(error);
        });
    } else if (message.content.startsWith(`${prefix}useronline`)) {
        var widget_enabled;
        await message.guild.fetchWidget().then(function (widget) {
                widget_enabled = widget.enabled
            })
            .catch(console.error);
        if (widget_enabled) {
            axios.get('https://discord.com/api/guilds/' + message.guild.id + '/widget.json').then((res) => {
                // var indexloop = 0;
                // var botCount = 0;
                for (let index = 0; index < res.data.members.length; index++) {
                    message.channel.send((index + 1) + '. ' + res.data.members[index].username + ' : ' + res.data.members[index].status);
                    // if (res.data.members[index].username != 'Bot เปิดเพลง') {
                    //     indexloop++
                    //     message.channel.send(indexloop + '. ' + res.data.members[index].username + ' : ' + res.data.members[index].status);
                    // } else {
                    //     botCount++
                    // }

                }
                // var userSum = res.data.presence_count - botCount;
                message.channel.send("------------------------------------------");
                // message.channel.send("Online : " + userSum);
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            message.channel.send('ต้องเปิด widget ของ server นี้ก่อน')
        }

    } else if (message.content.startsWith(`${prefix}botv`)) {
        message.reply('Bot version 1.1.7 // Last Update 27/01/2021');
    } else if (message.content.match(/(\/google) (.*?) (.*)/gm)) {
        let re = /(\/google) (.*?) (.*)/gm
        let command = message.content.replace(re, '$1')
        let code = message.content.replace(re, '$2')
        let content = message.content.replace(re, '$3')
        if (command === '/google') {
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                connection.play('http://translate.google.com/translate_tts?ie=UTF-8&q=' + encodeURIComponent(content) + '&tl=' + code + '&client=tw-ob');
                message.reply('OK! : ' + code + ' ' + content);
            } else {
                message.reply('ต้องมีคนอยู่ในห้องก่อน');
            }
        }
    } else if (message.content.match(/(\/google) (.*)/g)) {
        let re = /(\/google) (.*)/g
        let command = message.content.replace(re, '$1')
        let content = message.content.replace(re, '$2')
        if (command === '/google') {
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                connection.play('http://translate.google.com/translate_tts?ie=UTF-8&q=' + encodeURIComponent(content) + '&tl=th&client=tw-ob');
                message.reply('OK! : ' + code + ' ' + content);
            } else {
                message.reply('ต้องมีคนอยู่ในห้องก่อน');
            }
        }
    } else if (message.content.match(/(\/twitter) (.*)/g)) {
        let re = /(\/twitter) (.*)/g
        let content = message.content.replace(re, '$2')
        axios.get('https://api-vue-sv1.herokuapp.com/twitter/trending/thailand/' + content).then((res) => {
            message.channel.send(
                "1. " + res.data[0].hastag + ' / ' + res.data[0].tweets + ' / ' + res.data[0].record + "\n" +
                "2. " + res.data[1].hastag + ' / ' + res.data[1].tweets + ' / ' + res.data[1].record + "\n" +
                "3. " + res.data[2].hastag + ' / ' + res.data[2].tweets + ' / ' + res.data[2].record + "\n" +
                "4. " + res.data[3].hastag + ' / ' + res.data[3].tweets + ' / ' + res.data[3].record + "\n" +
                "5. " + res.data[4].hastag + ' / ' + res.data[4].tweets + ' / ' + res.data[4].record + "\n" +
                "6. " + res.data[5].hastag + ' / ' + res.data[5].tweets + ' / ' + res.data[5].record + "\n" +
                "7. " + res.data[6].hastag + ' / ' + res.data[6].tweets + ' / ' + res.data[6].record + "\n" +
                "8. " + res.data[7].hastag + ' / ' + res.data[7].tweets + ' / ' + res.data[7].record + "\n" +
                "9. " + res.data[8].hastag + ' / ' + res.data[8].tweets + ' / ' + res.data[8].record + "\n" +
                "10. " + res.data[9].hastag + ' / ' + res.data[9].tweets + ' / ' + res.data[9].record + "\n"
            )
        }).catch(function (error) {

            console.log(error);
        });
    } else if (message.content.match(/(\/twitter)/g)) {
        axios.get('https://api-vue-sv1.herokuapp.com/twitter/trending/thailand/1d').then((res) => {
            message.channel.send(
                "1. " + res.data[0].hastag + ' / ' + res.data[0].tweets + ' / ' + res.data[0].record + "\n" +
                "2. " + res.data[1].hastag + ' / ' + res.data[1].tweets + ' / ' + res.data[1].record + "\n" +
                "3. " + res.data[2].hastag + ' / ' + res.data[2].tweets + ' / ' + res.data[2].record + "\n" +
                "4. " + res.data[3].hastag + ' / ' + res.data[3].tweets + ' / ' + res.data[3].record + "\n" +
                "5. " + res.data[4].hastag + ' / ' + res.data[4].tweets + ' / ' + res.data[4].record + "\n" +
                "6. " + res.data[5].hastag + ' / ' + res.data[5].tweets + ' / ' + res.data[5].record + "\n" +
                "7. " + res.data[6].hastag + ' / ' + res.data[6].tweets + ' / ' + res.data[6].record + "\n" +
                "8. " + res.data[7].hastag + ' / ' + res.data[7].tweets + ' / ' + res.data[7].record + "\n" +
                "9. " + res.data[8].hastag + ' / ' + res.data[8].tweets + ' / ' + res.data[8].record + "\n" +
                "10. " + res.data[9].hastag + ' / ' + res.data[9].tweets + ' / ' + res.data[9].record + "\n"
            )
        }).catch(function (error) {

            console.log(error);
        });
    } else if (message.content.match(/(\/youtube) (.*)/g)) {
        let re = /(\/youtube) (.*)/g
        let content = message.content.replace(re, '$2')
        var config = {
            method: 'get',
            url: 'https://classroom.googleapis.com/v1/courses/' + content + '/courseWork?courseWorkStates=PUBLISHED',
            headers: {
                'Authorization': 'Bearer ya29.a0AfH6SMBfqMnu56LOme1c9Tqv-EWf2FZN45eVdhyldp-y2Vmurs6UnKXhQaTQ854JEkgzTJOZb5VX-4ac1fxpRNB7bbtgJlwF-Rjon6MMmxvQVFRvd79u7W7lawIUk1eI_v68uRRj1BzxI25UpEZNFKIVi_XkUN7kd-XMtxJ5Omw',
                'Accept': 'application/json'
            }
        };
        axios(config).then((res) => {
            for (let index = 0; index < res.data.courseWork.length; index++) {
                message.channel.send(res.data.courseWork[index].title)
            }
        }).catch(function (error) {

            console.log(error);
        });
    } else {
        message.channel.send("คุณต้องป้อนคำสั่งที่ถูกต้อง!");
    }
});
var musicList = []

function getMusicList(message) {
    if (musicList[0]) {
        for (let index = 0; index < musicList.length; index++) {
            if (index == 0) {
                message.channel.send("**NowPlaying : **" + musicList[index].title);
            } else {
                message.channel.send("**NextPlay_" + index + " : **" + musicList[index].title);
                // if (index==1) {
                //     message.channel.send("**NextPlaying_"+index+" : **"+musicList[index].title);
                // }else{
                //     message.channel.send("**NextPlaying_"+index+" : **"+musicList[index].title);
                // }
            }
        }
    } else {
        message.channel.send('ยังไม่มีเพลง')
    }


}

async function execute(message, serverQueue) {
    // const args = message.content.split(" ");
    // message.content.match(/(\/play) (.*)/g)
    let re = /(\/play) (.*)/g
    let content = message.content.replace(re, '$2')

    // console.log(content);
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.channel.send(
            "คุณต้องอยู่ในช่องเสียงเพื่อเล่นเพลง!"
        );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
            "ฉันต้องการสิทธิ์ในการเข้าร่วมและพูดในช่องเสียงของคุณ!"
        );
    }

    var result2;
    let getVideoLink2 = getVideoLink(content)
    await getVideoLink2.then(function (result) {
        // console.log(result) // "Some User token"
        result2 = result
    })


    const songInfo = await ytdl.getInfo(result2);
    // console.log(songInfo)
    // await fs.writeFile('message.txt', JSON.stringify(songInfo), (err) => {
    //         if (err) throw err;
    //         console.log('Its saved!');
    //         });

    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        viewCount: modules_basic.nFormatter(songInfo.videoDetails.viewCount, 1),
        likes: modules_basic.nFormatter(songInfo.videoDetails.likes, 1),
        dislikes: modules_basic.nFormatter(songInfo.videoDetails.dislikes, 1),
        url_thumbnails: songInfo.videoDetails.thumbnails[songInfo.videoDetails.thumbnails.length - 1].url,
        author: songInfo.videoDetails.author.name,
        uploadDate: songInfo.videoDetails.uploadDate,
        type:"",
        author_play:message.author.username
    };

    if (!serverQueue) {
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);
        musicList.push(song)
        modules_web.modules_list_music_push(song,message.guild.id)


        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);
        musicList.push(song)
        modules_web.modules_list_music_push(song,message.guild.id)
        return message.channel.send(`**${song.title}** เพิ่มลงในคิวการเล่นแล้ว!`);
    }
}

function skip(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send(
            "คุณต้องอยู่ในช่องเสียงเพื่อข้ามเพลง!"
        );
    if (!serverQueue)
        return message.channel.send("ไม่มีเพลงให้ข้าม!");
    serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send(
            "คุณต้องอยู่ในช่องเสียงเพื่อหยุดเพลง!"
        );

    if (!serverQueue)
        return message.channel.send("ไม่มีเพลงให้หยุด!");

    serverQueue.songs = [];
    musicList = []
    modules_web.modules_list_music_clear(message.guild.id);
    serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        musicList.shift();
        modules_web.modules_list_music_clear();
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);

        return;
    }
    if (musicList[1]) {
        modules_web.modules_list_music_shift();
        musicList.shift();
    }
    // for (let index = 0; index < musicList.length; index++) {
    //     if (song.title == musicList[index].title) {
    //         musicList.slice(index-1);
    //     }
    // }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url, {
            filter: 'audioonly'
        }))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(modules_embeds.embeds_play_v2({
        song_Title: song.title,
        song_uploadDate: song.uploadDate,
        song_view_count: song.viewCount,
        song_likes: song.likes,
        song_disklike: song.dislikes,
        song_author: song.author,
        url_thumbnails: song.url_thumbnails
    }))





}

client.login(token);