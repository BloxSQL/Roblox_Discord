const express = require('express');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

const tokenPath = path.join(__dirname, 'token.json');
const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
const token = tokenData.BOT_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token).catch(err => {
    console.error('Failed to login:', err);
});

app.get('/check', (req, res) => {
    if (client.isReady()) {
        res.json({ status: 'online', username: client.user.tag });
    } else {
        res.json({ status: 'offline' });
    }
});

app.post('/status', (req, res) => {
    const { status, type } = req.body;
    if (!status || typeof status !== 'string') {
        return res.status(400).json({ error: 'Invalid status format' });
    }

    const activityTypes = {
        playing: ActivityType.Playing,
        streaming: ActivityType.Streaming,
        listening: ActivityType.Listening,
        watching: ActivityType.Watching,
        competing: ActivityType.Competing
    };

    const activityType = activityTypes[type?.toLowerCase()] || ActivityType.Playing;

    try {
        client.user.setPresence({
            activities: [{ name: status, type: activityType }],
            status: 'online'
        });
        res.json({ success: true, newStatus: status, newType: type || 'playing' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
