var modules_embeds = require("./modules_embeds.js");
const axios = require("axios");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const cheerio = require("cheerio");
const width = 400;
const height = 400;

exports.twitter = async (time) => {
  var res = await axios.get(
    `https://getdaytrends.com/thailand/top/tweeted/${time}`
  );
  var data = await res.data;
  return await data;
};

// exports.covid = (message) => {
//   const cheerio = require("cheerio");
//   const axios = require("axios");

//   const get_data = async () => {
//     var res = await axios.get(
//       "https://ddc.moph.go.th/viralpneumonia/index.php"
//     );
//     var data = await res.data;
//     return await data;
//   };
//   // $("body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div")
//   get_data().then((data) => {
//     const $ = cheerio.load(data);
//     let Confirmed = $(
//       "body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div > h4"
//     ).html();
//     let NewConfirmed = $(
//       "body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(1) > div > h4"
//     ).html();
//     let Severe = $(
//       "body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(2) > div > h4"
//     ).html();
//     let Dead = $(
//       "body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(3) > div > h4"
//     ).html();
//     let Date = $(
//       "body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div > div:nth-child(2) > div:nth-child(1) > div > div"
//     ).html();
//     let Time = $(
//         "body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div > div:nth-child(2) > div:nth-child(2) > div > div"
//       ).html();
//     message.channel.send(modules_embeds.embeds_covid({
//         Confirmed,
//         NewConfirmed,
//         Severe,
//         Dead,
//         Date,
//         Time
//     }))
//   });
// };

exports.covid = async (message) => {
  var res = await axios.get(
    `https://s.isanook.com/sh/0/covid_2019/data.json?${new Date().getTime(
      "th-TH"
    )}`
  );
  var data = await res.data;
  console.log(data);
  message.channel.send(
    modules_embeds.embeds_covid({
      Confirmed: data.thai.total_cases,
      NewConfirmed: data.thai.new_cases,
      Recovered: data.thai.recovered,
      Dead: data.thai.deaths,
      Date:data.date
    })
  );
};

exports.chart = (message) => {
  const chartCallback = (ChartJS) => {
    // Global config example: https://www.chartjs.org/docs/latest/configuration/
    ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
    // Global plugin example: https://www.chartjs.org/docs/latest/developers/plugins.html
    ChartJS.plugins.register({
      // plugin implementation
    });
    // New chart type example: https://www.chartjs.org/docs/latest/developers/charts.html
    ChartJS.controllers.MyType = ChartJS.DatasetController.extend({
      // chart implementation
    });
  };
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width,
    height,
    chartCallback,
  });

  (async () => {
    const configuration = {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: (value) => "$" + value,
              },
            },
          ],
        },
      },
    };
    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    message.channel.send({ files: image });
    // const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
    // const stream = chartJSNodeCanvas.renderToStream(configuration);
  })();
};

exports.visut = async (message) => {
  var res = await axios.get("http://www.visut.ac.th/vs/?paged=1");
  var data = await res.data;
  const $ = cheerio.load(data);
  const result =
    Array.from(
      $("#content > div.post.type-post.status-publish.format-standard.hentry")
    ).map((element) => ({
      timeStamp: `${$(element).find("div.postdate").text().split(" ")[1]} ${
        $(element).find("div.postdate").text().split(" ")[2]
      } ${$(element).find("div.postdate").text().split(" ")[3]}`,
      category: $(element).find("div.postdate").text().split(" ")[5],
      image_link:
        Array.from($(element).find("div.entry").find("img")).map((element2) =>
          $(element2).attr("src")
        ) || [],
      a_href1:
        Array.from($(element).find("div.entry").find("a")).map((element2) =>
          $(element2).attr("href")
        ) || [],
      a_href2: $(element).find("h2.title").find("a").attr("href") || [],
    })) || [];
  var obj = [];
  for (let index = 0; index < result.length; index++) {
    obj.push({
      name: `${result[index].timeStamp}`,
      value: `${result[index].category}
[ดูเพิ่มเติม](${result[index].a_href2})`,
      inline: true,
    });
  }
  // console.log(obj)
  message.channel.send(modules_embeds.embeds_visut(obj))
};
