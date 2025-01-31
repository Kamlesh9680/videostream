const { Telegraf } = require('telegraf');
const { MongoClient } = require('mongodb');

// Replace with your bot token and MongoDB connection string
const BOT_TOKEN = '7753775770:AAFGUQa_Ax9uKUI2OkjFtXfnI5yVJ3P2iqM';
const MONGO_URI = 'mongodb+srv://sonikamlesh191:hU8JgeFRoyJopnzl@videosdata.bntqx.mongodb.net/?retryWrites=true&w=majority&appName=videosdata';
const DB_NAME = 'test';
const COLLECTION_NAME = 'videos';

const bot = new Telegraf(BOT_TOKEN, { polling: true });
const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function getVideoRecord(videoId) {
    try {
        await client.connect();
        console.log("Connected")
        console.log(videoId)
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);
        return await collection.findOne({ videoId });
        console.log("FOund")
    } catch (error) {
        console.error('Error fetching video record:', error);
        return null;
    } finally {
        await client.close();
    }
}

function extractVideoId(url) {
    const match = url.match(/\/video-preview\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
}
bot.start((ctx) => {
    ctx.reply('Welcome');
});
bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    if (!text) return;

    const videoId = extractVideoId(text);
    if (!videoId) {
        ctx.reply('Invalid video link format. Please send a valid Safeboxhub video link.');
        return;
    }

    const videoRecord = await getVideoRecord(videoId);
    if (!videoRecord || !videoRecord.thumbnailPath) {
        ctx.reply('Video not found or missing thumbnail.');
        return;
    }

    const thumbnailUrl = `https://safeboxhub.in/${videoRecord.thumbnailPath}`;
    ctx.replyWithPhoto(thumbnailUrl, { caption: `Video link:\n${text}` });
});

bot.launch();
console.log('Bot is running...');
