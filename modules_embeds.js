const Discord = require("discord.js");
var modules_basic = require("./modules_basic.js");

var d = new Date();
var n = d.toJSON();

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

exports.embeds_play = (obj) => {
  // console.log(obj)
  const exampleEmbed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle(obj.song_Title)
    .addField("UploadDate", obj.song_uploadDate)
    .addField("ViewCount", obj.song_view_count)
    .addField("Likes", obj.song_likes)
    .addField("Dislikes", obj.song_disklike)
    .addField("Author", obj.song_author)
    .setImage(obj.url_thumbnails)
    .setTimestamp();

  return exampleEmbed;
};

exports.embeds_play_v2 = (obj) => {
  var embed = {
    title: obj.song_Title,
    color: 16711680,
    timestamp: n,
    footer: {
      icon_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1280px-YouTube_full-color_icon_%282017%29.svg.png",
      text: obj.song_Title,
    },
    thumbnail: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1280px-YouTube_full-color_icon_%282017%29.svg.png",
    },
    image: {
      url: obj.url_thumbnails,
    },
    fields: [
      {
        name: "UploadDate",
        value: obj.song_uploadDate,
        inline: false,
      },
      {
        name: "ViewCount",
        value: obj.song_view_count,
        inline: false,
      },
      {
        name: "Likes",
        value: obj.song_likes,
        inline: true,
      },
      {
        name: "Dislikes",
        value: obj.song_disklike,
        inline: true,
      },
      {
        name: "Author",
        value: obj.song_author,
        inline: false,
      },
    ],
  };
  return {
    embed,
  };
};

exports.embeds_covid = (obj) => {
  const embed = {
    title: "🇹🇭 สถานการณ์ในประเทศไทย 🇹🇭",
    color: 16711680,
    footer: {
      icon_url:
        "https://yt3.ggpht.com/ytc/AKedOLQNaerSIv-ZT47edbqfJzVwPV4SxTwo7rZDRjIbV3s",
      text: `${new Date(obj.Date * 1000).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })} • ${new Date(obj.Date * 1000).toLocaleTimeString("th-TH")}`,
    },
    fields: [
      {
        name: "สะสม",
        value: numberWithCommas(obj.Confirmed),
        inline: true,
      },
      {
        name: "รายใหม่",
        value: numberWithCommas(obj.NewConfirmed),
        inline: true,
      },
      {
        name: "หายแล้ว",
        value: numberWithCommas(obj.Recovered),
        inline: true,
      },
      {
        name: "เสียชีวิต",
        value: numberWithCommas(obj.Dead),
        inline: true,
      },
    ],
  };
  return {
    embed,
  };
};

exports.embeds_crypto = (obj) => {
  const embed = {
    title: "Crypto BITKUB",
    color: 16711680,
    timestamp: n,
    thumbnail: {
      url: "https://www.gj.mahidol.ac.th/main/wp-content/uploads/2020/04/Picture1_Covid.png",
    },
    // "footer": {
    //   "text": "UpdateDate :" + obj.UpdateDate
    // },
    fields: [
      {
        name: "THB_BTC",
        value: obj.THB_BTC.last,
        inline: true,
      },
      {
        name: "THB_ABT",
        value: obj.THB_ABT.last,
        inline: true,
      },
      {
        name: "THB_ADA",
        value: obj.THB_ADA.last,
        inline: true,
      },
      {
        name: "THB_BAND",
        value: obj.THB_BAND.last,
        inline: true,
      },
      {
        name: "THB_BAT",
        value: obj.THB_BAT.last,
        inline: true,
      },
      {
        name: "THB_BCH",
        value: obj.THB_BCH.last,
        inline: true,
      },
      {
        name: "THB_BNB",
        value: obj.THB_BNB.last,
        inline: true,
      },
      {
        name: "THB_BSV",
        value: obj.THB_BSV.last,
        inline: true,
      },
      {
        name: "THB_CVC",
        value: obj.THB_CVC.last,
        inline: true,
      },
      {
        name: "THB_DAI",
        value: obj.THB_DAI.last,
        inline: true,
      },
      {
        name: "THB_DOGE",
        value: obj.THB_DOGE.last,
        inline: true,
      },
      {
        name: "THB_DOT",
        value: obj.THB_DOT.last,
        inline: true,
      },
      {
        name: "THB_ETH",
        value: obj.THB_ETH.last,
        inline: true,
      },
      {
        name: "THB_EVX",
        value: obj.THB_EVX.last,
        inline: true,
      },
      {
        name: "THB_GLM",
        value: obj.THB_GLM.last,
        inline: true,
      },
      {
        name: "THB_INF",
        value: obj.THB_INF.last,
        inline: true,
      },
      {
        name: "THB_IOST",
        value: obj.THB_IOST.last,
        inline: true,
      },
      {
        name: "THB_JFIN",
        value: obj.THB_JFIN.last,
        inline: true,
      },
      {
        name: "THB_KNC",
        value: obj.THB_KNC.last,
        inline: true,
      },
      {
        name: "THB_KSM",
        value: obj.THB_KSM.last,
        inline: true,
      },
      {
        name: "THB_LINK",
        value: obj.THB_LINK.last,
        inline: true,
      },
      {
        name: "THB_LTC",
        value: obj.THB_LTC.last,
        inline: true,
      },
      {
        name: "THB_MANA",
        value: obj.THB_MANA.last,
        inline: true,
      },
      {
        name: "THB_NEAR",
        value: obj.THB_NEAR.last,
        inline: true,
      },
      {
        name: "THB_OMG",
        value: obj.THB_OMG.last,
        inline: true,
      },
      {
        name: "THB_POW",
        value: obj.THB_POW.last,
        inline: true,
      },
      {
        name: "THB_RDN",
        value: obj.THB_RDN.last,
        inline: true,
      },
      {
        name: "THB_SCRT",
        value: obj.THB_SCRT.last,
        inline: true,
      },
      {
        name: "THB_SIX",
        value: obj.THB_SIX.last,
        inline: true,
      },
      {
        name: "THB_SNT",
        value: obj.THB_SNT.last,
        inline: true,
      },
      {
        name: "THB_USDC",
        value: obj.THB_USDC.last,
        inline: true,
      },
      {
        name: "THB_USDT",
        value: obj.THB_USDT.last,
        inline: true,
      },
      {
        name: "THB_WAN",
        value: obj.THB_WAN.last,
        inline: true,
      },
      {
        name: "THB_XLM",
        value: obj.THB_XLM.last,
        inline: true,
      },
      {
        name: "THB_XRP",
        value: obj.THB_XRP.last,
        inline: true,
      },
      {
        name: "THB_ZIL",
        value: obj.THB_ZIL.last,
        inline: true,
      },
      {
        name: "THB_ZRX",
        value: obj.THB_ZRX.last,
        inline: true,
      },
    ],
  };
  return {
    embed,
  };
};

exports.embeds_twitter = (obj) => {
  var embed = {
    color: 4303841,
    timestamp: n,
    footer: {
      icon_url:
        "https://upload.wikimedia.org/wikipedia/th/6/62/Twitter_bird_logo_2012.png",
      text: "Trending In Thailand",
    },
    thumbnail: {
      url: "https://upload.wikimedia.org/wikipedia/th/6/62/Twitter_bird_logo_2012.png",
    },
    author: {
      name: "Trending In Thailand",
      url: "https://discordapp.com",
    },
    fields: [],
  };

  for (let index = 0; index < 10; index++) {
    obj2 = {
      name: index + 1 + ". " + obj[index].hastag,
      value:
        obj[index].tweets +
        " / " +
        obj[index].record +
        " [ดูเพิ่มเติม](https://twitter.com/search?q=" +
        encodeURIComponent(obj[index].hastag) +
        "&src=trend_click)",
    };
    embed.fields.push(obj2);
  }

  return {
    embed,
  };
};

exports.embeds_music_list = (obj) => {
  var embed = {
    color: 4303841,
    timestamp: n,
    footer: {
      text: "Music List",
    },
    author: {
      name: "Music List",
    },
    fields: [],
  };
  for (let index = 0; index < obj.length; index++) {
    if (embed.fields.length == 0) {
      embed.fields.push({
        name: index + 1 + ". " + obj[index].title,
        value: obj[index].author_play + " / playing",
      });
    } else {
      embed.fields.push({
        name: index + 1 + ". " + obj[index].title,
        value: obj[index].author_play + " / next",
      });
    }
  }
  return {
    embed,
  };
};

exports.embeds_user_online = (obj) => {
  var embed = {
    color: 16590970,
    timestamp: n,
    author: {
      name: "User Online",
    },
    fields: [],
  };
  for (let index = 0; index < obj.members.length; index++) {
    if (obj.members[index].status == "online") {
      var member_status = "🔴 ห้ามรบกวน";
    } else if (obj.members[index].status == "idle") {
      var member_status = "🌙 ไม่อยู่";
    } else {
      var member_status = "🟢 Online";
    }
    embed.fields.push({
      name: index + 1 + ". " + obj.members[index].username,
      value: member_status,
      inline: true,
    });
  }
  return {
    embed,
  };
};

exports.embeds_url_short = (obj) => {
  var embed = {
    color: 15622435,
    timestamp: n,
    footer: {
      icon_url:
        "https://docrdsfx76ssb.cloudfront.net/static/1616013790/pages/wp-content/uploads/2019/02/bitly.png",
      text: "bitly.com",
    },
    author: {
      name: "Link Short",
    },
    fields: [
      {
        name: "URL_Old",
        value: obj.data.long_url,
      },
      {
        name: "URL_New",
        value: obj.data.link,
      },
    ],
  };

  return {
    embed,
  };
};

exports.embeds_help = () => {
  const embed = {
    color: 16590970,
    timestamp: n,
    author: {
      name: "Command SynthX",
    },
    fields: [
      {
        name: "*play",
        value: "เปิดเพลง : *play <YOUTUBE URL> || Keyword",
      },
      {
        name: "*skip",
        value: "ข้ามเพลง",
      },
      {
        name: "*stop",
        value: "หยุดเพลง",
      },
      {
        name: "*g",
        value: "เสียง Google : *g th สวัสดี",
      },
      {
        name: "*crypto",
        value: "ดูราคา Crypto ใน Bitkub",
      },
      {
        name: "*covid",
        value: "ดูจำนวนผู้ติดเชื้อ Covid",
      },
      {
        name: "*twitter",
        value: "ดู trending ใน twitter : *twitter [day][week][month][year]",
      },
      {
        name: "*cinema",
        value: "ดูรอบฉายหนังในจังหวัดกาญจนบุรี : *cinema [sf][major]",
      },
      {
        name: "*urls",
        value: "ย่อลิงค์ : *urls [url]",
      },
      {
        name: "*musiclist",
        value: "ดูคิวรายการเพลง",
      },
      {
        name: "*useronline",
        value: "แสดงสถานะของ user ใน discord",
      },
      {
        name: "*qr",
        value: "สร้าง QR-Code : *qr [text]",
      },
      {
        name: "*time",
        value: "เสียง Google บอกเวลา: *time",
      },
      {
        name: "*day",
        value: "เสียง Google บอกวันที่ : *day",
      },
      {
        name: "*ch",
        value: "ดู cub ใน clubhouse : *ch",
      },
      {
        name: "*ch events",
        value: "ดู events ใน clubhouse : *ch events",
      },
      {
        name: "*news",
        value: "รายการข่าวจาก Sanook.com : *news",
      },
      {
        name: "*what",
        value: "ดู Player List : *what",
      },
      {
        name: "*whatstop",
        value: "หยุด Interval : *whatstop",
      },
      {
        name: "*setbacklist",
        value: "Block การพิมพ์ : *setbacklist [id]",
      },
      {
        name: "*removebacklist",
        value: "ยกเลิกการ Block : *removebacklist [id]",
      },
      {
        name: "*spotify",
        value: "ดู Spotify Chart : *spotify [th][en][jp][kr][..]",
      },
      {
        name: "*backlist",
        value: "ดูว่าใครอู่ใน backlist : * ",
      },
      {
        name: "*botv",
        value: "ดู version ของ bot",
      },
    ],
  };
  return {
    embed,
  };
};

exports.embeds_clubhouse = (obj) => {
  const embed = {
    title: "Clubhouse Channal",
    thumbnail: {
      url: "https://play-lh.googleusercontent.com/GUMEenmbv0KoghJvUn0tTouMKf-7oO26fhH1LzfeAGQY2fylgK_Oh5OD3DFCg-SqKA0",
    },
    color: 16590970,
    timestamp: n,
    fields: [],
  };
  for (let index = 0; index < 10; index++) {
    if (obj.channels[index].club) {
      embed.fields.push({
        name: `Club : ${
          obj.channels[index].club ? obj.channels[index].club.name : "null"
        }`,
        value: `
        TOPIC : ${obj.channels[index].topic}
🙍‍♂️ : ${obj.channels[index].num_all}
:speech_balloon: : ${obj.channels[index].num_speakers}
[link](${obj.channels[index].url})
------------------------------------`,
      });
    } else {
      continue;
    }
  }
  return { embed };
};

exports.embeds_clubhouse_comming = (obj) => {
  console.log(obj);
  const embed = {
    title: "Clubhouse Comming Events",
    thumbnail: {
      url: "https://play-lh.googleusercontent.com/GUMEenmbv0KoghJvUn0tTouMKf-7oO26fhH1LzfeAGQY2fylgK_Oh5OD3DFCg-SqKA0",
    },
    color: 16590970,
    timestamp: n,
    fields: [],
  };
  for (let index = 0; index < 5; index++) {
    embed.fields.push({
      name: `Name : ${obj.events[index].name}`,
      value: `
        Description : ${obj.events[index].description.replace(
          /^(.{50}[^\s]*).*/,
          "$1"
        )}
TimeStart : ${new Date(obj.events[index].time_start).toLocaleString("th-TH")}
[link](${obj.events[index].url})
---------------------------------------------`,
    });
  }
  return { embed };
};

exports.embeds_moive = (obj, type) => {
  if (type == "sf") {
    title = "SF Cinema City Robinson Kanchanaburi";
    logo_url =
      "https://lh3.googleusercontent.com/LhLoK1y-oVUXvievJsUU3lLpoxBGdsR8DD3AZy6WOmGZd19oJ5e3ugjTTgTL13jCYyxKY-956oNoDFFOS0Ab6w=s0";
  } else {
    title = "Major TMK Kanchanaburi";
    logo_url =
      "https://deepscope.com/setscope-include/images/TH/icon/MAJOR.jpg";
  }
  const embed = {
    title: "รอบของวันนี้",
    thumbnail: {
      url: logo_url,
    },
    color: 16590970,
    timestamp: n,
    author: {
      name: title,
    },
    fields: [],
  };
  for (let index = 0; index < obj.results.length; index++) {
    word_round = "";
    for (
      let index2 = 0;
      index2 < obj.results[index].showtimes.length;
      index2++
    ) {
      word_round =
        word_round + " [" + obj.results[index].showtimes[index2] + "]";
    }
    embed.fields.push({
      name:
        obj.results[index].movie_title +
        " [" +
        obj.results[index].movie_duration +
        " นาที]",
      value: word_round,
    });
  }

  return {
    embed,
  };
};

exports.embeds_visut = (obj) => {
  const embed = {
    title: "Visut News",
    color: 16711680,
    timestamp: n,
    thumbnail: {
      url: "https://upload.wikimedia.org/wikipedia/th/3/37/Visut_logo.png",
    },
    // "footer": {
    //   "text": "UpdateDate :" + obj.UpdateDate
    // },
    fields: obj,
  };
  return {
    embed,
  };
};

exports.embeds_news = (obj) => {
  const embed = {
    title: "Sanook News",
    color: 16711680,
    thumbnail: {
      url: "https://yt3.ggpht.com/ytc/AKedOLQNaerSIv-ZT47edbqfJzVwPV4SxTwo7rZDRjIbV3s=s900-c-k-c0x00ffffff-no-rj",
    },
    "image": {
      "url": obj.thumbnail.replace("//","https://")
    },
    fields: [
      {
        name: obj.title,
        value: obj.description+` [ดูเพิ่มเติม](https://www.sanook.com/news/${obj.id})`,
      },
    ],
    "footer": {
      "icon_url": "https://yt3.ggpht.com/ytc/AKedOLQNaerSIv-ZT47edbqfJzVwPV4SxTwo7rZDRjIbV3s=s900-c-k-c0x00ffffff-no-rj",
      "text": `${obj.createdAt} • ${obj.createdAtdatetime}`
    },
  };
  return {
    embed,
  };
};

exports.embeds_what= (obj,length) => {
  const embed = {
    color: 16590970,
    timestamp: n,
    "thumbnail": {
      "url": "https://media.discordapp.net/attachments/800049668797104188/867445862287147038/download_4.png"
    },
    author: {
      name: `What City Player List : ${length}/500`,
    },
    fields: obj
  };
  return {
    embed,
  };
};

exports.embeds_backlist= (obj) => {
  const embed = {
    color: 16590970,
    timestamp: n,
    author: {
      name: `User Black List`,
    },
    fields: obj
  };
  return {
    embed,
  };
};

exports.embeds_spotify_chart = (obj) => {
  const embed = {
    color: 2020959,
    timestamp: n,
    "thumbnail": {
      "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/2560px-Spotify_logo_with_text.svg.png"
    },
    fields: obj.slice(0, 15).map((item)=>({
      name:`${item.index}. ${item.title}`,
      value:`${item.artist.join(',')} | ${item.streams} | [More](${item.link})`,
    }))
  };
  return {
    embed,
  };
};