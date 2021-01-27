const Discord = require("discord.js");
var modules_basic = require('./modules_basic.js')

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

exports.embeds_play_v2 = ((obj)=>{
    var d = new Date();
    var n = d.toJSON();
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
        "fields": [
          {
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
    return {embed}
})

exports.embeds_covid= ((obj)=>{
  var d = new Date();
  var n = d.toJSON();
  const embed = {
    "title": "Covid In Thailand",
    "color": 16711680,
    "timestamp": n,
    "thumbnail": {
      "url": "https://www.gj.mahidol.ac.th/main/wp-content/uploads/2020/04/Picture1_Covid.png"
    },
    "footer": {
      "text": "UpdateDate : 26/01/2021 11:40"
    },
    "fields": [
      {
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
  return {embed}
})

