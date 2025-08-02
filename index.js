require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '✅ Gann Bot готов к работе!');
});

// Пример команды /signal
bot.onText(/\/signal/, async (msg) => {
  const chatId = msg.chat.id;
  const signal = `📈 Triple Match Detected\nTime: 14:00 UTC+4\nDirection: BUY`;

  await bot.sendMessage(chatId, signal);
});
