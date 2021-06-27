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
                
            model.predict([parseFloat(s[1]), parseFloat(s[2]), parseFloat(s[3]), parseFloat(jres1[1]), parseFloat(jres1[2]), parseFloat(jres1[3])]);
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
r.get('/predict/:x/:y/:z', function(req, res, next).then((jres)=>{    
           model.predict(
            [
                parseFloat (req.params.x),
                parseFloat (req.params.y),
                parseFloat (req.params.z),
                parseFloat (jres[0]),
                parseFloat (jres[2]),
                parseFloat (jres[3])
                ]
     
     ).then((jres)=>{
       res.json({jres, jres_})
    })
});


module.exports = r;
