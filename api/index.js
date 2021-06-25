var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '1882953763:AAGtAdcnQXNe2bogE17VQjdwmUUcgieYHBU'
const bot = new TelegramBot(token, {polling: true});


// bots
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /predict to main predict`
    );   
});

state = 0;
bot.onText(/\/predict/, (msg) => { 
        bot.sendMessage(
        msg.chat.id,
        `Masukkan nilai x|y|z seperti 2|2|2`
    );
    state = 1   
});

bot.on('message',(msg) => {
    if(state == 1){
        s = msg.text.split("|");
        x = s[1]
        y = s[2]
        z = s[3]
        model.predict(
            [
                parseFloat (s[1]),
                parseFloat (s[2]),
                parseFloat (s[3])
            ]
        ).then((jres)=>{
            bot.sendMessage(
                msg.chat.id,
                `nilai M1 yang diprediksi adalah ${jres[1]} derajat`  
            );
           bot.sendMessage(
               msg.chat.id,
               `nilai M2 yang diprediksi adalah ${jres[2]} derajat`
           );
            bot.sendMessage(
               msg.chat.id,
               `nilai M3 yang diprediksi adalah ${jres[3]} derajat`
           );
        })
    }else{
        state = 0
    }
})


// routers
r.get('/prediction/:x/:y/z', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.x), // string to float
            parseFloat(req.params.y),
            parseFloat(req.params.z)
        ]
    ).then((jres)=>{
        res.json(jres);
    })
});

module.exports = r;
