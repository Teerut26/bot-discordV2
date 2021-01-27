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