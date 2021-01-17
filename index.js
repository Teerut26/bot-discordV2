const Discord = require("discord.js");
const {
    prefix,
    token
} = require("./config.json");
const ytdl = require("ytdl-core");
const axios = require('axios');
var fs = require("fs");

const client = new Discord.Client();

const queue = new Map();

function commaSeparateNumber(val) {

    var val2 = parseInt(val)
    while (/(\d+)(\d{3})/.test(val2.toString())) {
        val2 = val2.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val2;

}

function nFormatter(num, digits) {
    var si = [{
            value: 1,
            symbol: ""
        },
        {
            value: 1E3,
            symbol: "k"
        },
        {
            value: 1E6,
            symbol: "M"
        },
        {
            value: 1E9,
            symbol: "B"
        },
        {
            value: 1E12,
            symbol: "T"
        },
        {
            value: 1E15,
            symbol: "P"
        },
        {
            value: 1E18,
            symbol: "E"
        }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

async function getVideoLink(keyWord) {
    if (keyWord.match(/ht.*?\/\//g)) {
        return keyWord
    } else {
        const response = await axios.get('https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=' + encodeURIComponent(keyWord) + '&type=video&key=AIzaSyBLptVtxSxpl3q6gTULHyKRPxy_TSInQFk')
        return "https://www.youtube.com/watch?v=" + response.data.items[0].id.videoId
    }
}

client.once("ready", () => {
    console.log("Ready!");
});

client.once("reconnecting", () => {
    console.log("Reconnecting!");
});

client.once("disconnect", () => {
    console.log("Disconnect!");
});

client.on("message", async message => {
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
    }else if (message.content.startsWith(`${prefix}musiclist`)) {
        getMusicList(message)
        return;
    }else if (message.content.startsWith(`${prefix}help`)) {
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
            '/netflix\n' +
            '/ig\n' +
            '/musiclist\n' +
            '/useronline\n'
        );

    } else if (message.content.startsWith(`${prefix}netflix`)) {
        axios.get('https://api-vue-sv1.herokuapp.com/netflix/top').then((res) => {
            for (let index = 0; index < 7; index++) {
                // message.channel.send((index+1) + '. ' + res.data[index].title, {files: [res.data[index].image]});
                message.channel.send((index + 1) + '. ' + res.data[index].title);
            }
        }).catch(function (error) {
            console.log(error);
        });

    } else if (message.content.startsWith(`${prefix}covid`)) {
        axios.get('https://covid19.th-stat.com/api/open/today').then((res) => {
            message.channel.send(
                'Confirmed : ' + commaSeparateNumber(res.data.Confirmed) + '\n' +
                'Recovered : ' + commaSeparateNumber(res.data.Recovered) + '\n' +
                'Hospitalized : ' + commaSeparateNumber(res.data.Hospitalized) + '\n' +
                'Deaths : ' + commaSeparateNumber(res.data.Deaths) + '\n' +
                'NewConfirmed : ' + commaSeparateNumber(res.data.NewConfirmed) + '\n' +
                'NewRecovered : ' + commaSeparateNumber(res.data.NewRecovered) + '\n' +
                'NewHospitalized : ' + commaSeparateNumber(res.data.NewHospitalized) + '\n' +
                'NewDeaths : ' + commaSeparateNumber(res.data.NewDeaths) + '\n' +
                'UpdateDate : ' + res.data.UpdateDate + '\n'
            );
        }).catch(function (error) {
            console.log(error);
        });
    } else if (message.content.startsWith(`${prefix}useronline`)) {
        axios.get('https://discord.com/api/guilds/574794024712405003/widget.json').then((res) => {
            var indexloop = 0;
            var botCount = 0;
            for (let index = 0; index < res.data.members.length; index++) {
                if (res.data.members[index].username != 'Bot เปิดเพลง') {
                    indexloop++
                    message.channel.send(indexloop + '. ' + res.data.members[index].username + ' : ' + res.data.members[index].status);
                } else {
                    botCount++
                }

            }
            var userSum = res.data.presence_count - botCount;
            message.channel.send("------------------------------------------");
            message.channel.send("Online : " + userSum);
        }).catch(function (error) {
            console.log(error);
        });
    } else if (message.content.startsWith(`${prefix}useronline`)) {
        axios.get('https://discord.com/api/guilds/574794024712405003/widget.json').then((res) => {
            var indexloop = 0;
            var botCount = 0;
            for (let index = 0; index < res.data.members.length; index++) {
                if (res.data.members[index].username != 'Bot เปิดเพลง') {
                    indexloop++
                    message.channel.send(indexloop + '. ' + res.data.members[index].username + ' : ' + res.data.members[index].status);
                } else {
                    botCount++
                }

            }
            var userSum = res.data.presence_count - botCount;
            message.channel.send("------------------------------------------");
            message.channel.send("Online : " + userSum);
        }).catch(function (error) {
            console.log(error);
        });
    } else if (message.content.startsWith(`${prefix}botv`)) {
        message.reply('Bot version 1.1.4 // Last Update 17/01/2020');
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
    } else if (message.content.match(/(\/ig) (.*)/g)) {

        function getProfile(user) {
            fs.readFile("cookieIG.txt", (err, data) => {
                if (err) return console.error(err);
                cookieIG = data.toString()
            });
            var config = {
                method: 'get',
                url: 'https://www.instagram.com/' + user + '/?__a=1',
                headers: {
                    'authority': 'www.instagram.com',
                    'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
                    'accept': '*/*',
                    'x-ig-www-claim': 'hmac.AR1dA7uiCCCDZ37UuOqNcrJ4cUxG7OqBkCe1-Y1nFc147-cn',
                    'x-requested-with': 'XMLHttpRequest',
                    'sec-ch-ua-mobile': '?0',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
                    'x-ig-app-id': '936619743392459',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-dest': 'empty',
                    'referer': 'https://www.instagram.com/lalalalisa_m/',
                    'accept-language': 'th-TH,th;q=0.9,en;q=0.8',
                    'cookie': cookieIG
                }
            };
            axios(config)
                .then(function (response) {
                    message.channel.send(user + " // " + nFormatter(response.data.graphql.user.edge_followed_by.count, 1), {
                        files: [response.data.graphql.user.profile_pic_url]
                    })
                    console.log(user + " // " + nFormatter(response.data.graphql.user.edge_followed_by.count, 1));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        let re = /(\/ig) (.*)/g
        let command = message.content.replace(re, '$1')
        let content = message.content.replace(re, '$2')
        var cookieIG = ""
        fs.readFile("cookieIG.txt", (err, data) => {
            if (err) return console.error(err);
            cookieIG = data.toString()
        });
        var config = {
            method: 'get',
            url: 'https://www.instagram.com/web/search/topsearch/?context=blended&query=' + encodeURIComponent(content) + '&rank_token=0.5264008246075622&include_reel=true',
            headers: {
                'authority': 'www.instagram.com',
                'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
                'accept': '*/*',
                'x-ig-www-claim': 'hmac.AR1dA7uiCCCDZ37UuOqNcrJ4cUxG7OqBkCe1-Y1nFc147-cn',
                'x-requested-with': 'XMLHttpRequest',
                'sec-ch-ua-mobile': '?0',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
                'x-ig-app-id': '936619743392459',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'referer': 'https://www.instagram.com/teerut_1t/',
                'accept-language': 'th-TH,th;q=0.9,en;q=0.8',
                'cookie': cookieIG
            }
        };
        axios(config).then((res) => {
            for (let index = 0; index < 5; index++) {
                getProfile(res.data.users[index].user.username)
                // console.log(res.data.users[index].user.username);
                // message.channel.send(res.data.users[index].user.username + " : " + res.data.users[index].user.pk, {
                //     files: [res.data.users[index].user.profile_pic_url]
                // })
            }
            // console.log(res.data.users)
        }).catch(function (error) {
            console.log(error);
        });
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

function getMusicList(message){
    if (musicList[0]) {
        for (let index = 0; index < musicList.length; index++) {
            if (index == 0) {
                message.channel.send("**NowPlaying : **"+musicList[index].title);
            }else{
                message.channel.send("**NextPlay_"+index+" : **"+musicList[index].title);
                // if (index==1) {
                //     message.channel.send("**NextPlaying_"+index+" : **"+musicList[index].title);
                // }else{
                //     message.channel.send("**NextPlaying_"+index+" : **"+musicList[index].title);
                // }
            }
        }
    }else{
        message.channel.send('ยังไม่มีเพลง')
    }
    
    
}

async function execute(message, serverQueue) {
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
        viewCount: nFormatter(songInfo.videoDetails.viewCount, 1),
        likes: nFormatter(songInfo.videoDetails.likes, 1),
        dislikes: nFormatter(songInfo.videoDetails.dislikes, 1),
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
            play(message.guild, queueContruct.songs[0]);
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
    serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
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
        .play(ytdl(song.url, { filter: 'audioonly' }))
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
}

client.login(token);