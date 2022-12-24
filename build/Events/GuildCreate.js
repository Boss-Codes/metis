"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
const mongoose_1 = __importDefault(require("mongoose"));
const config = require('../../config.json');
main_1.Metis.client.on('guildCreate', async (guild) => {
    await main_1.Metis.models.guild.create({
        _id: new mongoose_1.default.Types.ObjectId(),
        guildId: guild.id,
        guildName: guild.name,
        owner: main_1.Metis.util.getFullName(await main_1.Metis.client.getRESTUser(guild.ownerID)),
        ownerId: guild.ownerID
    });
    if (main_1.Metis.client.user.id === '564472435336806450') {
        main_1.Metis.client.executeWebhook(config.guildWebID, config.guildWebhook, {
            embeds: [{
                    author: { name: 'Added', icon_url: main_1.Metis.client.user.avatarURL },
                    color: main_1.Metis.colors.green,
                    description: `**ID:** \`${guild.id}\`\n**Name:** \`${guild.name}\`\n**Members:** \`${guild.members.size}\`\n**Owner:** \`${main_1.Metis.util.getFullName(await main_1.Metis.client.getRESTUser(guild.ownerID))}\`\n**Created At**: \`${guild.createdAt}\``,
                    timestamp: new Date,
                    footer: { text: `Total Guilds: ${main_1.Metis.client.guilds.size}` }
                }]
        });
    }
    else {
        if (!config.whitelistedGuilds.includes(guild.id)) {
            return main_1.Metis.client.leaveGuild(guild.id);
        }
        main_1.Metis.client.executeWebhook(config.guildWebAlphaID, config.guildWebAlpha, {
            embeds: [{
                    author: { name: 'Added', icon_url: main_1.Metis.client.user.avatarURL },
                    color: main_1.Metis.colors.green,
                    description: `**ID:** \`${guild.id}\`\n**Name:** \`${guild.name}\`\n**Members:** \`${guild.members.size}\`\n**Owner:** \`${main_1.Metis.util.getFullName(await main_1.Metis.client.getRESTUser(guild.ownerID))}\`\n**Created At**: \`${guild.createdAt}\``,
                    timestamp: new Date,
                    footer: { text: `Total Guilds: ${main_1.Metis.client.guilds.size}` }
                }]
        });
    }
});
