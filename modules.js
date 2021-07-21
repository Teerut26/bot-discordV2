var modules_embeds = require("./modules_embeds.js");
const axios = require("axios");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const cheerio = require("cheerio");
const ChartJSImage = require("chart.js-image");
const { MessageAttachment } = require("discord.js");
const width = 400;
const height = 400;

exports.twitter = async (time) => {
  var res = await axios.get(
    `https://getdaytrends.com/thailand/top/tweeted/${time}`
  );
  var data = await res.data;
  return await data;
};

exports.covid = async (message) => {
  var res = await axios.get(
    `https://s.isanook.com/sh/0/covid_2019/data.json?${new Date().getTime(
      "th-TH"
    )}`
  );
  var data = await res.data;
  message.channel.send(
    modules_embeds.embeds_covid({
      Confirmed: data.thai.total_cases,
      NewConfirmed: data.thai.new_cases,
      Recovered: data.thai.recovered,
      Dead: data.thai.deaths,
      Date: data.date,
    })
  );
};

exports.chart_thailand = async (message) => {
  let res1 = await axios.get(
    `https://s.isanook.com/an/0/covid-19/static/data/thailand/daily/latest.json?${new Date().getTime()}`
  );
  let url_last_update = await res1.data.url;
  let current_month = new Date().getMonth();

  let res2 = await axios.get(url_last_update);
  let data = await res2.data;
  let lable = await data.data
    .filter(
      (date) =>
        Number.parseInt(date.date.split("-")[0]) >= 2021 &&
        Number.parseInt(date.date.split("-")[1]) >= current_month - 3
    )
    .map((date) => date.date);
  let confirmed = await data.data
    .filter(
      (date) =>
        Number.parseInt(date.date.split("-")[0]) >= 2021 &&
        Number.parseInt(date.date.split("-")[1]) >= current_month - 3
    )
    .map((date) => date.confirmed);
  let recovered = await data.data
    .filter(
      (date) =>
        Number.parseInt(date.date.split("-")[0]) >= 2021 &&
        Number.parseInt(date.date.split("-")[1]) >= current_month - 3
    )
    .map((date) => date.recovered);
  let deaths = await data.data
    .filter(
      (date) =>
        Number.parseInt(date.date.split("-")[0]) >= 2021 &&
        Number.parseInt(date.date.split("-")[1]) >= current_month - 3
    )
    .map((date) => date.deaths);

  const width = 2000; //px
  const height = 900; //px
  const backgroundColor = "white"; //backgroundColor

  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width,
    height,
    backgroundColor,
  });

  const plugin = {
    id: "custom_canvas_background_color",
    beforeDraw: (chart) => {
      const ctx = chart.canvas.getContext("2d");
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  const configuration = {
    type: "line",
    data: {
      labels: lable,
      datasets: [
        {
          label: "confirmed",
          data: confirmed,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
        {
          label: "recovered",
          data: recovered,
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
        {
          label: "deaths",
          data: deaths,
          backgroundColor: ["rgba(255, 206, 86, 0.2)"],
          borderColor: ["rgba(255, 206, 86, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 30,
            },
          },
        },
        title: {
          display: true,
          text: `Update : ${res1.data.lastUpdated} Dev By : Teerut`,
          font: {
            size: 30,
          },
        },
      },
    },
    plugins: [plugin],
  };
  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  message.channel.send(new MessageAttachment(image, `chart.png`));
};

exports.chart_vaccination = async (message) => {
  let res1 = await axios.get(
    `https://s.isanook.com/an/0/covid-19/static/data/thailand/vaccination/latest.json?${new Date().getTime()}`
  );
  let url_last_update = await res1.data.url;
  let current_month = new Date().getMonth();

  let res2 = await axios.get(url_last_update);
  let data = await res2.data;
  let lable = await data.data[0].timelineData.map((item) => item.date);
  let dors_all = await data.data[0].timelineData.map((item) => item.number);
  let dors1 = await data.data[1].timelineData.map((item) => item.number);
  let dors2 = await data.data[2].timelineData.map((item) => item.number);
  // let confirmed = await data.data.map((date) => date.confirmed);
  // let recovered = await data.data.map((date) => date.recovered);
  // let deaths = await data.data.map((date) => date.deaths);

  const width = 2000; //px
  const height = 900; //px
  const backgroundColor = "white"; //backgroundColor

  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width,
    height,
    backgroundColor,
  });

  const plugin = {
    id: "custom_canvas_background_color",
    beforeDraw: (chart) => {
      const ctx = chart.canvas.getContext("2d");
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  const configuration = {
    type: "line",
    data: {
      labels: lable,
      datasets: [
        {
          label: "จำนวนโดสที่ฉีดไปแล้ว",
          data: dors_all,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
        {
          label: "เข็มที่ 1",
          data: dors1,
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
        {
          label: "เข็มที่ 2",
          data: dors2,
          backgroundColor: ["rgba(255, 206, 86, 0.2)"],
          borderColor: ["rgba(255, 206, 86, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 30,
            },
          },
        },
        title: {
          display: true,
          text: `Vaccination : ${res1.data.lastUpdated} Dev By : Teerut`,
          font: {
            size: 30,
          },
        },
      },
    },
    plugins: [plugin],
  };
  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  message.channel.send(new MessageAttachment(image, `chart.png`));
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
  message.channel.send(modules_embeds.embeds_visut(obj));
};
