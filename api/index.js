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

module.exports = r;
