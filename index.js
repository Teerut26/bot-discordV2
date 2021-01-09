const Discord = require("discord.js");
const {
    prefix,
    token
} = require("./config.json");
const ytdl = require("ytdl-core");
const axios = require('axios');

const client = new Discord.Client();

const queue = new Map();

function commaSeparateNumber(val) {

    var val2 = parseInt(val)
    while (/(\d+)(\d{3})/.test(val2.toString())) {
        val2 = val2.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val2;

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
            '/netflix\n' +
            '/useronline\n'
        );

    }else if (message.content.startsWith(`${prefix}netflix`)) {
        axios.get('https://api-vue-sv1.herokuapp.com/netflix/top').then((res) => {
            for (let index = 0; index < 7; index++) {
                    // message.channel.send((index+1) + '. ' + res.data[index].title, {files: [res.data[index].image]});
                    message.channel.send((index+1) + '. ' + res.data[index].title);
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
    }else if (message.content.startsWith(`${prefix}useronline`)) {
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
        message.reply('Bot version 1.1.2 // Last Update 09/01/2020');
    }else if (message.content.match(/(\/google) (.*?) (.*)/gm)) {
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
    } else {
        message.channel.send("คุณต้องป้อนคำสั่งที่ถูกต้อง!");
    }
});

async function execute(message, serverQueue) {
    const args = message.content.split(" ");

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

    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
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
        return message.channel.send(`${song.title} เพิ่มลงในคิวการเล่นแล้ว!`);
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
    serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`กำลังเริ่มเล่น!: **${song.title}**`);
}

client.login(token);