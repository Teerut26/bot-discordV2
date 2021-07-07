const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");
const axios = require("axios");
const QRCode = require("qrcode");

var fs = require("fs");
const client = new Discord.Client();

const cheerio = require("cheerio");

var queue = new Map();
var modules_basic = require("./modules_basic.js");
var modules_embeds = require("./modules_embeds.js");
var modules_web = require("./modules_web.js");
var modules_generator = require("./modules_generator_image.js");
var modules = require("./modules.js");

require("./modules_web.js");
// const modules_player = require('./modules_player')

// var obj_log = JSON.parse(log_json);
// var txt = log_json
// var obj = JSON.parse(txt);
// console.log(obj);

// fs.readFile('./log.json', function (err, data) {
//     console.log(data);
// });

async function getVideoLink(keyWord) {
  if (keyWord.match(/ht.*?\/\//g)) {
    return keyWord;
  } else {
    const response = await axios.get(
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" +
        encodeURIComponent(keyWord) +
        "&type=video&key=AIzaSyBLptVtxSxpl3q6gTULHyKRPxy_TSInQFk"
    );
    return (
      "https://www.youtube.com/watch?v=" + response.data.items[0].id.videoId
    );
  }
}

// console.log(client.uptime);

client.on("ready", () => {
  console.log("Ready!");

  type_bot = ["WATCHING", "PLAYING", "LISTENING"];
  text_activity = ["Porn Hub", "PUBG", "Spotify"];
  client.user.setActivity("SynthX | *help", {
    type: "LISTENING",
  });
  // client.user.setUsername('SynthX')
  //     .then(user => console.log(`My new username is ${user.username}`))
  //     .catch(console.error);

  // setInterval(() => {
  //     axios.get('https://api.bitkub.com/api/market/ticker').then((res) => {
  //         // console.log(res.data.THB_BTC.last)
  //         client.user.setActivity(res.data.THB_BTC.last, {
  //             type: 'LISTENING'
  //         })
  //     }).catch(function (error) {
  //         console.log(error);
  //     });
  // }, 5000)

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

var musicList = [];

client.on("message", async (message) => {
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
    timeZone: "Asia/Bangkok",
  });
  let now = new Date(default_time);

  await fs.appendFile(
    "log.txt",
    `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}][${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()}][${message.guild.name}][${message.channel.name}][${
      message.author.username
    }] ${JSON.stringify(message.content)}\n`,
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );

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
    message.channel.send(modules_embeds.embeds_music_list(musicList));
  } else if (message.content.startsWith(`${prefix}help`)) {
    // message.channel.send(
    //     'คำสั่ง\n' +
    //     // ':musical_note:\n' +
    //     '/play <YOUTUBE URL>\n' +
    //     '/skip\n' +
    //     '/stop\n' +
    //     // ':loudspeaker:\n' +
    //     '/google <ISO-3166-code> <word>\n' +
    //     '/google <word>\n' +
    //     // ':radioactive:\n' +
    //     '/covid\n' +
    //     // ':hash:\n' +
    //     '/twitter [now][1d][7d][30d][year]\n' +
    //     '/botv\n' +
    //     '/musiclist\n' +
    //     '/useronline\n'
    // );
    message.channel.send(modules_embeds.embeds_help());
  } else if (message.content.startsWith(`${prefix}covid`)) {
    modules.covid(message)
    
  } else if (message.content.startsWith(`${prefix}crypto`)) {
    let baseUrl = "https://api.bitkub.com";
    axios
      .get(baseUrl + "/api/market/ticker")
      .then((res) => {
        message.channel.send(modules_embeds.embeds_crypto(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (message.content.startsWith(`${prefix}useronline`)) {
    var widget_enabled;
    await message.guild
      .fetchWidget()
      .then(function (widget) {
        widget_enabled = widget.enabled;
      })
      .catch(console.error);
    if (widget_enabled) {
      axios
        .get(
          "https://discord.com/api/guilds/" + message.guild.id + "/widget.json"
        )
        .then((res) => {
          modules_generator.user_online(message, res.data);
          // message.channel.send(modules_embeds.embeds_user_online(res.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      message.channel.send("ต้องเปิด widget ของ server นี้ก่อน");
    }
  } else if (message.content.startsWith(`${prefix}botv`)) {
    message.reply("Bot version 1.2.7// Last Update 7/07/2021");
  } else if (message.content.match(/(\*google) (.*?) (.*)/gm)) {
    let re = /(\*google) (.*?) (.*)/gm;
    let command = message.content.replace(re, "$1");
    let code = message.content.replace(re, "$2");
    let content = message.content.replace(re, "$3");
    if (command === "*google") {
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        connection.play(
          "http://translate.google.com/translate_tts?ie=UTF-8&q=" +
            encodeURIComponent(content) +
            "&tl=" +
            code +
            "&client=tw-ob"
        );
        message.reply("OK! : " + code + " " + content);
      } else {
        message.reply("ต้องมีคนอยู่ในห้องก่อน");
      }
    }
  } else if (message.content.match(/(\*google) (.*)/g)) {
    let re = /(\*google) (.*)/g;
    let command = message.content.replace(re, "$1");
    let content = message.content.replace(re, "$2");
    if (command === "*google") {
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        connection.play(
          "http://translate.google.com/translate_tts?ie=UTF-8&q=" +
            encodeURIComponent(content) +
            "&tl=th&client=tw-ob"
        );
        message.reply("OK! : " + code + " " + content);
      } else {
        message.reply("ต้องมีคนอยู่ในห้องก่อน");
      }
    }
  } else if (message.content.match(/(\*cinema) (.*)/g)) {
    let re = /(\*cinema) (.*)/g;
    let type_cinema = message.content.replace(re, "$2");

    if (type_cinema == "sf") {
      axios
        .get(
          "http://showtimes.everyday.in.th/api/v2/theater/25/showtimes/?offset=0&limit=30&date=today"
        )
        .then((respone) => {
          message.channel.send(
            modules_embeds.embeds_moive(respone.data, type_cinema)
          );
        });
    } else if (type_cinema == "major") {
      axios
        .get(
          "http://showtimes.everyday.in.th/api/v2/theater/266/showtimes/?offset=0&limit=30&date=today"
        )
        .then((respone) => {
          message.channel.send(
            modules_embeds.embeds_moive(respone.data, type_cinema)
          );
        });
    }
  } else if (message.content.match(/(\*urls) (.*)/g)) {
    let re = /(\*urls) (.*)/g;
    let content = message.content.replace(re, "$2");
    var data = "url=" + encodeURIComponent(content);

    var config = {
      method: "post",
      url: "https://bitly.com/data/anon_shorten",
      headers: {
        authority: "bitly.com",
        "sec-ch-ua":
          '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
        accept: "application/json, text/javascript, */*; q=0.01",
        "x-xsrftoken": "fac34714c49842a59f14651b42b85089",
        "x-requested-with": "XMLHttpRequest",
        "sec-ch-ua-mobile": "?0",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        origin: "https://bitly.com",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://bitly.com/",
        "accept-language": "th-TH,th;q=0.9,en;q=0.8",
        cookie:
          "_xsrf=fac34714c49842a59f14651b42b85089; anon_u=cHN1X185NWU1MTRmOS04N2Q1LTQ0OTctYWRiMS04NDY2MDNlOGZlOWY=|1616225331|dc8ccd1410dd96d988c1eeece84f04ebed3377bf; optimizelyEndUserId=oeu1616225332048r0.1252009492054551; _mkto_trk=id:754-KBJ-733&token:_mch-bitly.com-1616225332445-76585; _ga=GA1.2.532219545.1616225332; _gid=GA1.2.110884100.1616225332; wow-modal-id-7=yes; _gat=1",
      },
      data: data,
    };

    axios(config)
      .then((res) => {
        message.channel.send(modules_embeds.embeds_url_short(res.data));
        // console.log(res.data.data.link);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (message.content.match(/(\*twitter) (.*)/g)) {
    let re = /(\*twitter) (.*)/g;
    let content = message.content.replace(re, "$2");
    modules.twitter(content).then((data) => {
      const $ = cheerio.load(data);
      const result = Array.from(
          $(
            "#tab-day > div > table.table.table-hover.text-left.clickable.ranking.top.mb-0 > tbody > tr"
          )
        ).map((element) => ({
          index: $(element).find("tr > th").html(),
          hastag: $(element).find("td.main > a").html(),
          tweets: $(element).find("td:nth-child(3)").html(),
          record: $(element).find("td:nth-child(4)").html(),
        })) || [];
        message.channel.send(modules_embeds.embeds_twitter(result));
    })
  } else if (message.content.match(/(\*twitter)/g)) {
    modules.twitter("day").then((data) => {
      const $ = cheerio.load(data);
      const result = Array.from(
          $(
            "#tab-day > div > table.table.table-hover.text-left.clickable.ranking.top.mb-0 > tbody > tr"
          )
        ).map((element) => ({
          index: $(element).find("tr > th").html(),
          hastag: $(element).find("td.main > a").html(),
          tweets: $(element).find("td:nth-child(3)").html(),
          record: $(element).find("td:nth-child(4)").html(),
        })) || [];
        message.channel.send(modules_embeds.embeds_twitter(result));
    })
  } else if (message.content.match(/(\*qr) (.*)/g)) {
    let re = /(\*qr) (.*)/g;
    let content = message.content.replace(re, "$2");
    QRCode.toFile(
      "temp/filename.png",
      content,
      {
        color: {
          dark: "#020001", // Blue dots
          // light: '#0000' // Transparent background
          light: "#FFFFFF", // Transparent background
        },
      },
      function (err) {
        if (err) throw err;
        // message.channel.reply({files: ["temp/filename.png"]})
        message.reply({ files: ["temp/filename.png"] });
        console.log("done");
      }
    );
  } else if (message.content.match(/(\*time)/g)) {
    let default_time = new Date().toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
    });
    let now = new Date(default_time);
    let content = `ขณะนี้เวลา ${now.getHours()}นาฬิกา ${now.getMinutes()}นาที ${now.getSeconds()}วินาที`;

    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      connection.play(
        "http://translate.google.com/translate_tts?ie=UTF-8&q=" +
          encodeURIComponent(content) +
          "&tl=th&client=tw-ob"
      );
      message.reply("OK! : " + code + " " + content);
    } else {
      message.reply("ต้องมีคนอยู่ในห้องก่อน");
    }
  } else if (message.content.match(/(\*day)/g)) {
    let default_time = new Date();
    // let now = new Date(default_time);
    const result = default_time.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    // console.log(result)
    let content = `${result.replace(
      default_time.getFullYear() + 543,
      `พุทธศักราช ${default_time.getFullYear() + 543}`
    )}`;

    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      connection.play(
        "http://translate.google.com/translate_tts?ie=UTF-8&q=" +
          encodeURIComponent(content) +
          "&tl=th&client=tw-ob"
      );
      message.reply("OK! : " + content);
    } else {
      message.reply("ต้องมีคนอยู่ในห้องก่อน");
    }
  } else if (message.content === "*ch") {
    var config = {
      method: "get",
      url: "https://www.clubhouseapi.com/api/get_channels",
      headers: {
        Host: "www.clubhouseapi.com",
        accept: "application/json",
        "user-agent": "clubhouse/android/2090",
        "ch-appbuild": "2090",
        "ch-appversion": "0.1.5",
        "ch-deviceid": "4aa872ec-6082-4dfc-b1fb-b3bbfc441c04",
        "ch-locale": "th_TH",
        "ch-languages": "th-TH",
        "ch-keyboards": "",
        "ch-session-id": "01991c3a-9ab6-413d-8e6f-aabe8c913e3f",
        "ch-userid": "826575048",
        authorization: "Token a4efadc86d43e8595fc2635983ebd672e29a1d46",
        "accept-encoding": "gzip",
      },
    };

    axios(config)
      .then(function (response) {
        message.channel.send(modules_embeds.embeds_clubhouse(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (message.content.match(/(\*ch) (.*)/g)) {
    // let re = /(\*ch) (.*)/g;
    let re = /(\*ch) (.*)/g;
    let content = message.content.replace(re, "$2");
    console.log(content);
    if (content === "events") {
      var config = {
        method: "get",
        url: "https://www.clubhouseapi.com/api/get_events?is_filtered=true&page=1&page_size=25",
        headers: {
          Host: "www.clubhouseapi.com",
          accept: "application/json",
          "user-agent": "clubhouse/android/2090",
          "ch-appbuild": "2090",
          "ch-appversion": "0.1.5",
          "ch-deviceid": "4aa872ec-6082-4dfc-b1fb-b3bbfc441c04",
          "ch-locale": "th_TH",
          "ch-languages": "th-TH",
          "ch-keyboards": "",
          "ch-session-id": "2e32870d-ccea-4cb8-aa2f-f57d0d7865d0",
          "ch-userid": "826575048",
          authorization: "Token a4efadc86d43e8595fc2635983ebd672e29a1d46",
          "accept-encoding": "gzip",
        },
      };

      axios(config)
        .then(function (response) {
          message.channel.send(
            modules_embeds.embeds_clubhouse_comming(response.data)
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  } else if (message.content === "*test") {
    modules_generator.test1(message, "sfds");
  } else if (message.content === "*tor") {
    if (message.author.id === "574806737253826571") {
      let word = ["โคตรเท่", "เยด เยด พี่ต่อมีพลังว่ะ", "โก้มากพี่ต่อ"];
      let numberRandom = Math.floor(Math.random() * 3);
      message.reply(word[numberRandom]);
    } else {
      let word = ["มึงเป็นควยไร", "ไอหน้าหีอย่าเสือก", "ไอเหี้ยนี่ขี้เสือกจังวะ"];
      let numberRandom = Math.floor(Math.random() * 3);
      message.reply(word[numberRandom]);
    }
  } else {
    message.channel.send("คุณต้องป้อนคำสั่งที่ถูกต้อง!");
  }
});

async function execute(message, serverQueue) {
  // const args = message.content.split(" ");
  // message.content.match(/(\*play) (.*)/g)
  let re = /(\*play) (.*)/g;
  let content = message.content.replace(re, "$2");

  // console.log(content);
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send("คุณต้องอยู่ในช่องเสียงเพื่อเล่นเพลง!");
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "ฉันต้องการสิทธิ์ในการเข้าร่วมและพูดในช่องเสียงของคุณ!"
    );
  }

  var result2;
  let getVideoLink2 = getVideoLink(content);
  await getVideoLink2.then(function (result) {
    // console.log(result) // "Some User token"
    result2 = result;
  });

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
    url_thumbnails:
      songInfo.videoDetails.thumbnails[
        songInfo.videoDetails.thumbnails.length - 1
      ].url,
    author: songInfo.videoDetails.author.name,
    uploadDate: songInfo.videoDetails.uploadDate,
    type: "",
    author_play: message.author.username,
    author_profile_url: message.author.avatarURL("webp", true, 64),
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);
    musicList.push(song);
    modules_web.modules_list_music_push(song, message.guild.id);

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
    musicList.push(song);
    modules_web.modules_list_music_push(song, message.guild.id);
    return message.channel.send(`**${song.title}** เพิ่มลงในคิวการเล่นแล้ว!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send("คุณต้องอยู่ในช่องเสียงเพื่อข้ามเพลง!");
  if (!serverQueue) return message.channel.send("ไม่มีเพลงให้ข้าม!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send("คุณต้องอยู่ในช่องเสียงเพื่อหยุดเพลง!");

  if (!serverQueue) return message.channel.send("ไม่มีเพลงให้หยุด!");

  serverQueue.songs = [];
  musicList = [];
  modules_web.modules_list_music_clear();
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
    .play(
      ytdl(song.url, {
        filter: "audioonly",
      })
    )
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(
    modules_embeds.embeds_play_v2({
      song_Title: song.title,
      song_uploadDate: song.uploadDate,
      song_view_count: song.viewCount,
      song_likes: song.likes,
      song_disklike: song.dislikes,
      song_author: song.author,
      url_thumbnails: song.url_thumbnails,
    })
  );
}

client.login(token);
