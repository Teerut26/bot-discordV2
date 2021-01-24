const axios = require('axios');
const ytdl = require("ytdl-core");
var fs = require("fs");
var modules_basic = require('./modules_basic')
const queue = new Map();
const Discord = require("discord.js");

var musicList = []
exports.getMusicList = ((message) => {
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
})

// exports.getVideoLink = async (keyWord)=>{
//     if (keyWord.match(/ht.*?\/\//g)) {
//         return keyWord
//     } else {
//         const response = await axios.get('https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=' + encodeURIComponent(keyWord) + '&type=video&key=AIzaSyBLptVtxSxpl3q6gTULHyKRPxy_TSInQFk')
//         return "https://www.youtube.com/watch?v=" + response.data.items[0].id.videoId
//     }
// }

async function getVideoLink(keyWord) {
    if (keyWord.match(/ht.*?\/\//g)) {
        return keyWord
    } else {
        const response = await axios.get('https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=' + encodeURIComponent(keyWord) + '&type=video&key=AIzaSyBLptVtxSxpl3q6gTULHyKRPxy_TSInQFk')
        return "https://www.youtube.com/watch?v=" + response.data.items[0].id.videoId
    }
}

module.exports.execute = async (message, serverQueue) => {
    // console.log(serverQueue);
    // const args = message.content.split(" ");
    // message.content.match(/(\/play) (.*)/g)
    let re = /(\/play) (.*)/g
    let content = message.content.replace(re, '$2')

    console.log(content);
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
        url_thumbnails: songInfo.videoDetails.thumbnails[4].url,
        author: songInfo.videoDetails.author.name,
        uploadDate: songInfo.videoDetails.uploadDate
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


        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            module.exports.play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);
        musicList.push(song)
        return message.channel.send(`**${song.title}** เพิ่มลงในคิวการเล่นแล้ว!`);
    }
}

// module.exports = execute(message, serverQueue)

exports.skip = ((message, serverQueue) => {
    if (!message.member.voice.channel)
        return message.channel.send(
            "คุณต้องอยู่ในช่องเสียงเพื่อข้ามเพลง!"
        );
    if (!serverQueue)
        return message.channel.send("ไม่มีเพลงให้ข้าม!");
    serverQueue.connection.dispatcher.end();
})

exports.stop = ((message, serverQueue) => {
    if (!message.member.voice.channel)
        return message.channel.send(
            "คุณต้องอยู่ในช่องเสียงเพื่อหยุดเพลง!"
        );

    if (!serverQueue)
        return message.channel.send("ไม่มีเพลงให้หยุด!");

    serverQueue.songs = [];
    musicList = []
    serverQueue.connection.dispatcher.end();
})

exports.play = ((guild, song) => {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        musicList.shift();
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);

        return;
    }
    if (musicList[1]) {
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

    serverQueue.textChannel.send(`
            กำลังเริ่มเล่น!: **${song.title}**\nUploadDate: **${song.uploadDate}**\nViewCount: **${song.viewCount}**\nLikes: **${song.likes}**\nDislikes: **${song.dislikes}**\nAuthor: **${song.author}**
    
            `, {
        files: [song.url_thumbnails]
    });
    // message.channel.send({files: [song.url_thumbnails]});
})