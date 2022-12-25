# Metis 
Metis is a multi-purpose bot meant to be an all in one solution for your Discord server! Metis features a rich set of intuitive features that you may customize to your liking. 

# Features 
- Information commands 
- Fun commands 
- Full scale logging 
- Configuration for server managers 
- Full moderation 
- Tags system 
- Welcome/Goodbye 
- Possibly a ticket system! 

If you have any other suggestions for features, feel free to open up an issue or join our [support server](https://discord.gg/mePghx6dQy)

# Important Links/Information 
- Bot Invite: [click me](https://discord.com/api/oauth2/authorize?client_id=1053147299611693056&permissions=8&scope=applications.commands%20bot)
- Support Server: https://discord.gg/mePghx6dQy
- Wiki: https://github.com/boss207/metis/wiki

# Open Source 
Metis is designed to be open-source so that you may host it on your own and customize it to your liking. In order to host the bot, you must have basic knowledge in the following areas: 
- Discord development 
- Typescript
- Javascript
- MongoDB/Mongoose 

## Steps to Self-Host: 
1. Create a Discord bot.
2. Get the token.
3. Clone the GitHub repository. 
4. Create a config.json file, see the example file below for what to do.
5. Go to the MongoDB website and create an account, create a cluster for the bot, and save the connection string and add it to your config. 
6. `cd` into the folder and `npm run start` and you are good to go! 

### Example Config File 
```js
{
    "token": "",
    "mongoLogin": "",

    "prefix": "",
    "devPrefix": "",
    "alphaPrefix": "",

    "readyWebhookID": "",
    "readyWebhook": "",
    "guildWebhook": "",
    "guildWebID": "",
    "devWebhook": "",
    "guildWebAlphaID": "",
    "guildWebAlpha": "",

    "version": "v1.0.0", 
    "defaultColor": 3242182, 
    "whitelistedGuilds": [],
    "modules": , 
    "metisClient": "", 
    "metisDevClient": "", 
    "build": ""
}
```