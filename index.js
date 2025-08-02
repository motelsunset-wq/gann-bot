import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const prompt = `Сделай анализ по методу Ганна (симметрия времени, углы, Square of 9) для следующих пар:
USD/CAD, EUR/JPY, EUR/USD, EUR/CHF, USD/CHF, EUR/GBP, GBP/USD, AUD/CAD, NZD/USD, GBP/CHF, AUD/USD, GBP/JPY, USD/JPY, CHF/JPY, EUR/CAD, AUD/JPY, EUR/AUD, AUD/NZD.
Таймфрейм: H1, Время: UTC+4.
Покажи только те пары, где есть Triple Match (все 3 метода совпадают).`;

async function getOpenAIResponse() {
  const res = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7
  }, {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  return res.data.choices[0].message.content;
}

async function sendToTelegram(text) {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`;
  await axios.post(url, {
    chat_id: process.env.CHANNEL_ID,
    text: text,
    parse_mode: 'Markdown'
  });
}

(async () => {
  try {
    const gannResult = await getOpenAIResponse();
    await sendToTelegram(`📊 *GANN Triple Match Анализ:*

${gannResult}`);
  } catch (err) {
    console.error('Ошибка:', err.message);
  }
})();
