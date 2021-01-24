const express = require('express')
const app = express();
const router = express.Router();
const axios = require('axios');
const cors = require('cors');
var fs = require("fs");


const port = process.env.PORT || 80 // port 
app.use(cors());
app.use(express.json());

app.get("/discord/bot", (req, res, next) => {
    var content = fs.readFileSync('log.txt').toString();
    res.send(content)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});