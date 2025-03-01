
# Discord Bot Status Management

This project consists of two parts: a Node.js Express server that interacts with a Discord bot and a Lua module for Roblox to manage the status of the bot. The server provides endpoints to check the bot's status and update it, while the Lua module facilitates interaction with the server.

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Lua Module](#lua-module)
- [Contributing](#contributing)

## Overview

The Node.js Express server connects to a Discord bot using the `discord.js` library. It allows you to check if the bot is online and set its activity status (playing, streaming, etc.) through HTTP requests. The Lua module is designed to run in Roblox and enables developers to check the bot's status and update it via HTTP calls.

## Installation

### Node.js Server

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install express discord.js
   ```

3. Create a `token.json` file in the root directory with the following structure:
   ```json
   {
       "BOT_TOKEN": "<your-bot-token>"
   }
   ```

4. Run the server:
   ```bash
   node <your-server-file>.js
   ```

### Lua Module

Copy the Lua module code into your Roblox project and require it as needed.

## Usage

### Node.js Server

- Start the server to listen for requests on port 3000.
- The server provides a way to check if the bot is online and to update its status.

### Lua Module

- Use the `GetBot` function to instantiate a bot object and check its status.
- Use the `SetStatus` function to update the bot's status.

## API Endpoints

### 1. `GET /check`

Checks if the bot is online.

**Response:**
```json
{
    "status": "online",
    "username": "<bot-username>"
}
```
If the bot is offline:
```json
{
    "status": "offline"
}
```

### 2. `POST /status`

Updates the bot's activity status.

**Request Body:**
```json
{
    "status": "<new-status>",
    "type": "<activity-type>"
}
```

**Activity Types:**
- `playing`
- `streaming`
- `listening`
- `watching`
- `competing`

**Response:**
```json
{
    "success": true,
    "newStatus": "<new-status>",
    "newType": "<activity-type>"
}
```
In case of an error:
```json
{
    "error": "<error-message>"
}
```

### 3. `GET /getserver/:guildId`

Checks if the bot is in a specific guild.

**Response:**
```json
{
    "inServer": true,
    "guildId": "<guild-id>",
    "botStatus": "<bot-status>"
}
```
If not in the server:
```json
{
    "inServer": false,
    "guildId": "<guild-id>"
}
```

## Lua Module

### Methods

- `module:GetBot(Host: string)`

  Retrieves the bot status from the specified host.

- `BotMethods:SetStatus(Status: { Status: string, State: number }, Message: string)`

  Sets the bot's status based on the provided status and message.

### Enums

The following enums are available for status types:

```lua
Enums.Status = {
    Playing = { Status = "playing", State = 1 },
    Streaming = { Status = "streaming", State = 2 },
    Listening = { Status = "listening", State = 3 },
    Watching = { Status = "watching", State = 4 },
    Competing = { Status = "competing", State = 5 }
}
```

## Contributing

Contributions are welcome! Please submit a pull request for any changes you would like to make.
