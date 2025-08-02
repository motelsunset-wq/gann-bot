# GANN Telegram Bot

Бот, который каждый день отправляет анализ по методу Ганна (Triple Match) в Telegram-канал.

## Установка

1. Установи зависимости:
```
npm install
```

2. Создай `.env` файл и вставь:

```
TELEGRAM_TOKEN=твой_токен_бота
CHANNEL_ID=@имя_канала
OPENAI_API_KEY=твой_openai_api_key
```

3. Запусти:
```
node index.js
```
