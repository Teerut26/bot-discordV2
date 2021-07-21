const { MessageAttachment } = require("discord.js");
const nodeHtmlToImage = require("node-html-to-image");
const cheerio = require('cheerio');
const { default: axios } = require("axios");
const puppeteer = require("puppeteer");

const get_data = async (url) => {
  console.log("Started...");

  let webUrl = url;

  // let browser = await puppeteer.launch({ headless: false });
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(webUrl, { waitUntil: "networkidle2" });

  console.log(webUrl + " has loaded. ");
  const data = await page.evaluate(() => document.querySelector('#__next > div.jsx-3589768037.CovidFirstPage.clearfix > div.jsx-3589768037.headingSection > div > div.jsx-3589768037.row > div:nth-child(1) > div').outerHTML);
  console.log(data);
  return data
  // console.log(data);
}

exports.test1 = async (msg, name) => {
  let tr = "";

  for (let index = 0; index < 10; index++) {
    tr =
      tr +
      `\n<tr>
        <th>
          <img
          style="border-radius: 14px;"
            width="50"
            height="50"
            src="https://cdn.discordapp.com/avatars/574806737253826571/1d5c60f4fecad2b102a3ab6e44a78328.png?size=512"
          />
        </th>
        <td>dog Hunter</td>
        <td>online</td>
      </tr>`;
  }

  const _htmlTemplate = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      </head>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
        crossorigin="anonymous"
      />
      <body>
      <table class="table table-dark ">
      <tbody>
        ${tr}
      </tbody>
    </table>
      </body>
    </html>
    
  `;

  const images = await nodeHtmlToImage({
    html: _htmlTemplate,
    quality: 200,
    type: "png",
    puppeteerArgs: {
      args: ["--no-sandbox"],
    },
    encoding: "buffer",
  });
  // for more configuration options refer to the library

  return msg.channel.send(new MessageAttachment(images, `${name}.png`));
};

exports.user_online = async (msg, obj) => {
  //   console.log(obj.members)

  let tr = '';

  for (let index = 0; index < obj.members.length; index++) {
    tr =
      tr +
      `\n<tr>
        <th>
          <img
          style="border-radius: 14px;"
            width="50"
            height="50"
            src="${obj.members[index].avatar_url}"
          />
        </th>
        <td>${obj.members[index].username}</td>
        <td>${obj.members[index].status}</td>
      </tr>`;
  }

  const _htmlTemplate = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      </head>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
        crossorigin="anonymous"
      />
      <body style="width: 400px;">
      <table style="width: 400px;" class="table table-dark ">
      <tbody>
        User Online : ${obj.members.length} | ${new Date().toLocaleString("th-TH")} | Dev By Teerut
        ${tr}
      </tbody>
    </table>
      </body>
    </html>
    
  `;

  const images = await nodeHtmlToImage({
    html: _htmlTemplate,
    quality: 1000,
    type: "png",
    puppeteerArgs: {
      args: ["--no-sandbox"],
    },
    encoding: "buffer",
  });
  // for more configuration options refer to the library
  console.log(images)

  return msg.channel.send(new MessageAttachment(images, `12.png`));
};


exports.covid = async (msg, obj) => {
  // console.log(get_data("https://www.sanook.com/covid-19/"))
  //   console.log(obj.members)
  var res = await axios.get("https://ddc.moph.go.th/viralpneumonia/index.php")
  let $ = cheerio.load(res.data)
  let covid_html = $('body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div').html()

  let tr = '';

  const _htmlTemplate = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <style>
        /*! CSS Used from: https://ddc.moph.go.th/viralpneumonia/css/style.css */
        h4,
        h5 {
          margin: 0;
          color: #e84c93;
          font-weight: 400;
          font-family: "Muli", sans-serif;
        }
        h4 {
          font-size: 24px;
        }
        h5 {
          font-size: 18px;
        }
        /*! CSS Used from: https://ddc.moph.go.th/bootstrap/css/bootstrap.min.css */
        *,
        ::after,
        ::before {
          box-sizing: border-box;
        }
        h4,
        h5 {
          margin-top: 0;
          margin-bottom: 0.5rem;
        }
        a {
          color: #007bff;
          text-decoration: none;
          background-color: transparent;
        }
        a:hover {
          color: #0056b3;
          text-decoration: underline;
        }
        h4,
        h5 {
          margin-bottom: 0.5rem;
          font-weight: 500;
          line-height: 1.2;
        }
        h4 {
          font-size: 1.5rem;
        }
        h5 {
          font-size: 1.25rem;
        }
        .modal-content {
          position: relative;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-direction: column;
          flex-direction: column;
          width: 100%;
          pointer-events: auto;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 0.3rem;
          outline: 0;
        }
        .modal-title {
          margin-bottom: 0;
          line-height: 1.5;
        }
        @media print {
          *,
          ::after,
          ::before {
            text-shadow: none !important;
            box-shadow: none !important;
          }
          a:not(.btn) {
            text-decoration: underline;
          }
        }
        /*! CSS Used from: https://ddc.moph.go.th/viralpneumonia/css/ddc_css.css */
        h5 {
          font-family: prompt;
          font-size: 1.2em;
          margin-bottom: 1rem;
        }
        a {
          -webkit-transition: all 0.2s ease-in-out;
          -moz-transition: all 0.2s ease-in-out;
          -o-transition: all 0.2s ease-in-out;
          -ms-transition: all 0.2s ease-in-out;
          transition: all 0.2s ease-in-out;
        }
        a:hover {
          text-decoration: none;
        }
        /*! CSS Used from: Embedded */
        * {
          box-sizing: border-box;
        }
        /*! CSS Used from: https://ddc.moph.go.th/viralpneumonia/edit/css/w3.css */
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
        a {
          background-color: transparent;
          -webkit-text-decoration-skip: objects;
        }
        a:active,
        a:hover {
          outline-width: 0;
        }
        ::-webkit-input-placeholder {
          color: inherit;
          opacity: 0.54;
        }
        a {
          color: inherit;
        }
        :disabled * {
          pointer-events: none;
        }
        .w3-row:after,
        .w3-row:before {
          content: "";
          display: table;
          clear: both;
        }
        .w3-col {
          float: left;
          width: 100%;
        }
        .w3-col.s4 {
          width: 33.33333%;
        }
        .w3-col.s6 {
          width: 49.99999%;
        }
        @media (min-width: 601px) {
          .w3-col.m6 {
            width: 49.99999%;
          }
        }
        .w3-round-large {
          border-radius: 8px;
        }
        .w3-padding-small {
          padding: 4px 8px !important;
        }
        .w3-padding {
          padding: 8px 16px !important;
        }
        /*! CSS Used from: Embedded */
        .modal-content {
          font-family: prompt;
        }
        .modal-title {
          font-size: 36px;
          color: #000;
        }
        .popup_link a {
          color: #fff;
        }
        .popup_link a:hover {
          color: #000;
        }
        .mybg0 {
          background-color: #fff;
          color: #000;
          border: solid 1px #ec008c;
          border-radius: 8px;
        }
        .mybg1,
        .mybg2,
        .mybg3 {
          color: #fff;
          border-radius: 8px;
          margin-right: 2px;
          margin-left: 2px;
          padding-top: 4px;
          padding-bottom: 2px;
        }
        .mybg1 {
          background-color: #7ec9e1;
        }
        .mybg2 {
          background-color: #449edd;
        }
        .mybg3 {
          background-color: #3f51b5;
        }
        .x1 {
          margin-left: 2px;
          margin-bottom: 8px;
          height: 94px;
          padding-right: 8px;
        }
        .x2 {
          text-align: right;
          margin-left: 2px;
          margin-bottom: 8px;
          height: 94px;
          padding-right: 8px;
        }
        .x1 div,
        .x2 div {
          margin-top: 30px;
        }
        .txt,
        .txt2 {
          text-shadow: 1px 2px 2px #000;
        }
        .txt {
          color: #f4ee36;
        }
        .txt2 {
          color: #96deff;
        }
        .fs2 {
          font-size: 3vh;
        }
        .fs2 {
          font-size: 2.5vh;
        }
        .header_blog {
          padding-top: 8px;
          padding-bottom: 8px;
          font-family: prompt;
        }
        /*! CSS Used fontfaces */
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 300;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afT3GLRrX.woff2)
            format("woff2");
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
            U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 300;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afTzGLRrX.woff2)
            format("woff2");
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
            U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 300;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afTLGLQ.woff2)
            format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afT3GLRrX.woff2)
            format("woff2");
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
            U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afTzGLRrX.woff2)
            format("woff2");
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
            U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afTLGLQ.woff2)
            format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afT3GLRrX.woff2)
            format("woff2");
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
            U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afTzGLRrX.woff2)
            format("woff2");
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
            U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afTLGLQ.woff2)
            format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afT3GLRrX.woff2)
            format("woff2");
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
            U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afTzGLRrX.woff2)
            format("woff2");
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
            U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afTLGLQ.woff2)
            format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afT3GLRrX.woff2)
            format("woff2");
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
            U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afTzGLRrX.woff2)
            format("woff2");
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
            U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afTLGLQ.woff2)
            format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 800;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afT3GLRrX.woff2)
            format("woff2");
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
            U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 800;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afTzGLRrX.woff2)
            format("woff2");
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
            U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 800;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afTLGLQ.woff2)
            format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afT3GLRrX.woff2)
            format("woff2");
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
            U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afTzGLRrX.woff2)
            format("woff2");
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
            U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        @font-face {
          font-family: "Muli";
          font-style: normal;
          font-weight: 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/muli/v22/7Auwp_0qiz-afTLGLQ.woff2)
            format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
      </style>
      </head>
     
      <body>
     ${covid_html}
     By : https://ddc.moph.go.th/
      </body>
    </html>
    
  `;

  const images = await nodeHtmlToImage({
    html: _htmlTemplate,
    quality: 1000,
    type: "png",
    puppeteerArgs: {
      args: ["--no-sandbox"],
    },
    encoding: "buffer",
  });
  // for more configuration options refer to the library
  

  return msg.channel.send(new MessageAttachment(images, `covid.png`));
};


// exports.covid = async (msg, obj) => {
//   // console.log(get_data("https://www.sanook.com/covid-19/"))

//   //   console.log(obj.members)
//   var res = await get_data("https://www.sanook.com/covid-19/")
//   // let $ = cheerio.load(res.data)
//   // let covid_html = $('body > div.banner-section.spad > div > div:nth-child(1) > div.col-lg-6 > div > div').html()

//   // let tr = '';

//   const _htmlTemplate = `<!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta http-equiv="X-UA-Compatible" content="ie=edge" />
//         <style>
        
//       </style>
//       </head>
     
//       <body>
//      ${res}
//       </body>
//     </html>
    
//   `;

//   const images = await nodeHtmlToImage({
//     html: _htmlTemplate,
//     quality: 1000,
//     type: "png",
//     puppeteerArgs: {
//       args: ["--no-sandbox"],
//     },
//     encoding: "buffer",
//   });
//   // for more configuration options refer to the library

//   return msg.channel.send(new MessageAttachment(images, `covid.png`));
// };