var modules_embeds = require("./modules_embeds.js");
const axios = require("axios");

exports.twitter =  ( async (time)=>{
    var res = await axios.get(
      `https://getdaytrends.com/thailand/top/tweeted/${time}`
    );
    var data = await res.data;
    return await data;
})

exports.covid = (message) => {
  const cheerio = require("cheerio");
  const axios = require("axios");

  const get_data = async () => {
    var res = await axios.get(
      "https://ddc.moph.go.th/viralpneumonia/index.php"
    );
    var data = await res.data;
    return await data;
  };
  // $("body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div")
  get_data().then((data) => {
    const $ = cheerio.load(data);
    let Confirmed = $(
      "body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div > h4"
    ).html();
    let NewConfirmed = $(
      "body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(1) > div > h4"
    ).html();
    let Severe = $(
      "body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(2) > div > h4"
    ).html();
    let Dead = $(
      "body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(3) > div > h4"
    ).html();
    let Date = $(
      "body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div > div:nth-child(2) > div:nth-child(1) > div > div"
    ).html();
    let Time = $(
        "body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div > div:nth-child(2) > div:nth-child(2) > div > div"
      ).html();
    message.channel.send(modules_embeds.embeds_covid({
        Confirmed,
        NewConfirmed,
        Severe,
        Dead,
        Date,
        Time
    }))
  });
};
