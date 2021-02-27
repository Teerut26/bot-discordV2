const Discord = require("discord.js");
var modules_basic = require('./modules_basic.js')

var d = new Date();
var n = d.toJSON();

exports.embeds_play = ((obj) => {
  // console.log(obj)
  const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle(obj.song_Title)
    .addField('UploadDate', obj.song_uploadDate)
    .addField('ViewCount', obj.song_view_count)
    .addField('Likes', obj.song_likes)
    .addField('Dislikes', obj.song_disklike)
    .addField('Author', obj.song_author)
    .setImage(obj.url_thumbnails)
    .setTimestamp()

  return exampleEmbed
})

exports.embeds_play_v2 = ((obj) => {
  var embed = {
    "title": obj.song_Title,
    "color": 16711680,
    "timestamp": n,
    "footer": {
      "icon_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1280px-YouTube_full-color_icon_%282017%29.svg.png",
      "text": obj.song_Title
    },
    "thumbnail": {
      "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1280px-YouTube_full-color_icon_%282017%29.svg.png"
    },
    "image": {
      "url": obj.url_thumbnails
    },
    "fields": [{
        "name": "UploadDate",
        "value": obj.song_uploadDate,
        "inline": false
      },
      {
        "name": "ViewCount",
        "value": obj.song_view_count,
        "inline": false
      },
      {
        "name": "Likes",
        "value": obj.song_likes,
        "inline": true
      },
      {
        "name": "Dislikes",
        "value": obj.song_disklike,
        "inline": true
      },
      {
        "name": "Author",
        "value": obj.song_author,
        "inline": false
      },
    ]
  };
  return {
    embed
  }
})

exports.embeds_covid = ((obj) => {
  const embed = {
    "title": "Covid In Thailand",
    "color": 16711680,
    "timestamp": n,
    "thumbnail": {
      "url": "https://www.gj.mahidol.ac.th/main/wp-content/uploads/2020/04/Picture1_Covid.png"
    },
    "footer": {
      "text": "UpdateDate :" + obj.UpdateDate
    },
    "fields": [{
        "name": "Confirmed",
        "value": modules_basic.commaSeparateNumber(obj.Confirmed),
        "inline": true
      },
      {
        "name": "Recovered",
        "value": modules_basic.commaSeparateNumber(obj.Recovered),
        "inline": true
      },
      {
        "name": "Hospitalized",
        "value": modules_basic.commaSeparateNumber(obj.Hospitalized),
        "inline": true
      },
      {
        "name": "Deaths",
        "value": modules_basic.commaSeparateNumber(obj.Deaths),
        "inline": true
      },
      {
        "name": "NewConfirmed",
        "value": modules_basic.commaSeparateNumber(obj.NewConfirmed),
        "inline": true
      },
      {
        "name": "NewRecovered",
        "value": modules_basic.commaSeparateNumber(obj.NewRecovered),
        "inline": true
      },
      {
        "name": "NewHospitalized",
        "value": modules_basic.commaSeparateNumber(obj.NewHospitalized),
        "inline": true
      },
      {
        "name": "NewDeaths",
        "value": modules_basic.commaSeparateNumber(obj.NewDeaths),
        "inline": true
      }
    ]
  };
  return {
    embed
  }
})

exports.embeds_crypto = ((obj) => {
  const embed = {
    "title": "Crypto BITKUB",
    "color": 16711680,
    "timestamp": n,
    "thumbnail": {
      "url": "https://www.gj.mahidol.ac.th/main/wp-content/uploads/2020/04/Picture1_Covid.png"
    },
    // "footer": {
    //   "text": "UpdateDate :" + obj.UpdateDate
    // },
    "fields": [{
        "name": "THB_BTC",
        "value": obj.THB_BTC.last,
        "inline": true
      },
      {
        "name": "THB_ABT",
        "value": obj.THB_ABT.last,
        "inline": true
      },
      {
        "name": "THB_ADA",
        "value": obj.THB_ADA.last,
        "inline": true
      },
      {
        "name": "THB_BAND",
        "value": obj.THB_BAND.last,
        "inline": true
      },
      {
        "name": "THB_BAT",
        "value": obj.THB_BAT.last,
        "inline": true
      },
      {
        "name": "THB_BCH",
        "value": obj.THB_BCH.last,
        "inline": true
      },
      {
        "name": "THB_BNB",
        "value": obj.THB_BNB.last,
        "inline": true
      },
      {
        "name": "THB_BSV",
        "value": obj.THB_BSV.last,
        "inline": true
      },
      {
        "name": "THB_CVC",
        "value": obj.THB_CVC.last,
        "inline": true
      },
      {
        "name": "THB_DAI",
        "value": obj.THB_DAI.last,
        "inline": true
      },
      {
        "name": "THB_DOGE",
        "value": obj.THB_DOGE.last,
        "inline": true
      },
      {
        "name": "THB_DOT",
        "value": obj.THB_DOT.last,
        "inline": true
      },
      {
        "name": "THB_ETH",
        "value": obj.THB_ETH.last,
        "inline": true
      },
      {
        "name": "THB_EVX",
        "value": obj.THB_EVX.last,
        "inline": true
      },
      {
        "name": "THB_GLM",
        "value": obj.THB_GLM.last,
        "inline": true
      },
      {
        "name": "THB_INF",
        "value": obj.THB_INF.last,
        "inline": true
      },
      {
        "name": "THB_IOST",
        "value": obj.THB_IOST.last,
        "inline": true
      },
      {
        "name": "THB_JFIN",
        "value": obj.THB_JFIN.last,
        "inline": true
      },
      {
        "name": "THB_KNC",
        "value": obj.THB_KNC.last,
        "inline": true
      },
      {
        "name": "THB_KSM",
        "value": obj.THB_KSM.last,
        "inline": true
      },
      {
        "name": "THB_LINK",
        "value": obj.THB_LINK.last,
        "inline": true
      },
      {
        "name": "THB_LTC",
        "value": obj.THB_LTC.last,
        "inline": true
      },
      {
        "name": "THB_MANA",
        "value": obj.THB_MANA.last,
        "inline": true
      },
      {
        "name": "THB_NEAR",
        "value": obj.THB_NEAR.last,
        "inline": true
      },
      {
        "name": "THB_OMG",
        "value": obj.THB_OMG.last,
        "inline": true
      },
      {
        "name": "THB_POW",
        "value": obj.THB_POW.last,
        "inline": true
      },
      {
        "name": "THB_RDN",
        "value": obj.THB_RDN.last,
        "inline": true
      },
      {
        "name": "THB_SCRT",
        "value": obj.THB_SCRT.last,
        "inline": true
      },
      {
        "name": "THB_SIX",
        "value": obj.THB_SIX.last,
        "inline": true
      },
      {
        "name": "THB_SNT",
        "value": obj.THB_SNT.last,
        "inline": true
      },
      {
        "name": "THB_USDC",
        "value": obj.THB_USDC.last,
        "inline": true
      },
      {
        "name": "THB_USDT",
        "value": obj.THB_USDT.last,
        "inline": true
      },
      {
        "name": "THB_WAN",
        "value": obj.THB_WAN.last,
        "inline": true
      },
      {
        "name": "THB_XLM",
        "value": obj.THB_XLM.last,
        "inline": true
      },
      {
        "name": "THB_XRP",
        "value": obj.THB_XRP.last,
        "inline": true
      },
      {
        "name": "THB_ZIL",
        "value": obj.THB_ZIL.last,
        "inline": true
      },
      {
        "name": "THB_ZRX",
        "value": obj.THB_ZRX.last,
        "inline": true
      }
    ]
  };
  return {
    embed
  }
})


exports.embeds_twitter = ((obj) => {
  var embed = {
    "color": 4303841,
    "timestamp": n,
    "footer": {
      "icon_url": "https://upload.wikimedia.org/wikipedia/th/6/62/Twitter_bird_logo_2012.png",
      "text": "Trending In Thailand"
    },
    "thumbnail": {
      "url": "https://upload.wikimedia.org/wikipedia/th/6/62/Twitter_bird_logo_2012.png"
    },
    "author": {
      "name": "Trending In Thailand",
      "url": "https://discordapp.com"
    },
    "fields": []
  };

  for (let index = 0; index < 10; index++) {
    obj2 = {
      "name": (index + 1) + ". " + obj[index].hastag,
      "value": obj[index].tweets + " / " + obj[index].record + " [ดูเพิ่มเติม](https://twitter.com/search?q=" + encodeURIComponent(obj[index].hastag) + "&src=trend_click)"
    }
    embed.fields.push(obj2)
  }

  return {
    embed
  }
})


exports.embeds_music_list = ((obj) => {
  var embed = {
    "color": 4303841,
    "timestamp": n,
    "footer": {
      "text": "Music List"
    },
    "author": {
      "name": "Music List",
    },
    "fields": []
  };
  for (let index = 0; index < obj.length; index++) {
    if (embed.fields.length == 0) {
      embed.fields.push({
        "name": (index + 1) + ". " + obj[index].title,
        "value": obj[index].author_play + " / playing"
      })
    } else {
      embed.fields.push({
        "name": (index + 1) + ". " + obj[index].title,
        "value": obj[index].author_play + " / next"
      })
    }
  }
  return {
    embed
  }
})

exports.embeds_user_online = ((obj) => {
  var embed = {
    "color": 16590970,
    "timestamp": n,
    "author": {
      "name": "User Online"
    },
    "fields": []
  };
  for (let index = 0; index < obj.members.length; index++) {
    if (obj.members[index].status == 'online') {
      var member_status = '🔴 ห้ามรบกวน'
    }else if (obj.members[index].status == 'idle') {
      var member_status = '🌙 ไม่อยู่'
    }else{
      var member_status = '🟢 Online'
    }
    embed.fields.push({
      "name": (index+1)+". "+obj.members[index].username,
      "value": member_status
    })
  }
  return {
    embed
  }
})

exports.embeds_help = (()=>{
  const embed = {
    "color": 16590970,
    "timestamp": n,
    "author": {
      "name": "Command SynthX"
    },
    "fields": [
      {
        "name": "/play",
        "value": "เปิดเพลง : /play <YOUTUBE URL> || Keyword"
      },
      {
        "name": "/skip",
        "value": "ข้ามเพลง"
      },
      {
        "name": "/stop",
        "value": "หยุดเพลง"
      },
      {
        "name": "/google",
        "value": "เสียง Google : /google th สวัสดี"
      },
      {
        "name": "/crypto",
        "value": "ดูราคา Crypto ใน Bitkub"
      },
      {
        "name": "/covid",
        "value": "ดูจำนวนผู้ติดเชื้อ Covid"
      },
      {
        "name": "/twitter",
        "value": "ดู trending ใน twitter : /twitter [now][1d][7d][30d][year]"
      },
      {
        "name": "/musiclist",
        "value": "ดูคิวรายการเพลง"
      },
      {
        "name": "/useronline",
        "value": "แสดงสถานะของ user ใน discord"
      },
      {
        "name": "/botv",
        "value": "ดู version ของ bot"
      }
    ]
  }
  return {embed}
})