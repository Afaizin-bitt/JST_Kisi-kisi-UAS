var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '1882953763:AAGtAdcnQXNe2bogE17VQjdwmUUcgieYHBU'
const bot = new TelegramBot(token, {polling: true});

state = 0;
// bots
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /predict to main predict`
    );   
    state = 0;
});


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
        model.predict(
            [
                parseFloat (s[1]),
                parseFloat (s[2]),
                parseFloat (s[3])
            ]
        ).then((jres1)=>{
            console.log(jres1);
                
            cls_model.predict([parseFloat(s[0]), parseFloat(s[1]), parseFloat(jres1[0]), parseFloat(jres1[1])]);
                bot.sendMessage(
                    msg.chat.id,
                    `nilai M1 yang diprediksi adalah ${jres1[1]} derajat`
                    );
                bot.sendMessage(
                    msg.chat.id,
                    `nilai M2 yang diprediksi adalah ${jres1[2]} derajat`
                    );
                bot.sendMessage(
                        msg.chat.id,
                        `nilai M2 yang diprediksi adalah ${jres1[3]} derajat`
                        );
                        
            })
            
    }
})

// routers
r.get('/predict/:x/:y/:z', function(req, res, next) {    
    model.predict(
        [
             parseFloat (jres[1]),
             parseFloat (jres[2]),
             parseFloat (jres[3]),
        ]
    ).then((jres)=>{
        res.json(jres);
    })
});


module.exports = r;
