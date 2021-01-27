const express = require('express')
const app = express();
const router = express.Router();
const axios = require('axios');
const cors = require('cors');
var fs = require("fs");


const port = process.env.PORT || 80 // port 
// app.use(express.static(__dirname + './public')).use(cors());

app.use(express.json());

let list_music = {
    status:404,
    data:[]
}

exports.modules_list_music_push = ((obj)=>{
    list_music.status = 200
    list_music.data.push(obj)
    list_music.data[list_music.data.length-1].type = "next"
    list_music.data[0].type = "playing"
    
})
exports.modules_list_music_shift = (()=>{
    list_music.data.shift();
    list_music.data[0].type = "playing"
})

exports.modules_list_music_clear = (()=>{
    list_music.data = []
    list_music.status = 404
})

app.use('/discord', express.static('public'));

app.get("/discord/bot", (req, res, next) => {
    res.send(JSON.stringify(list_music))
    // var content = fs.readFileSync('log.txt').toString();
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});