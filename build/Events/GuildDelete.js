"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
const config = require('../../config.json');
main_1.Metis.client.on('guildDelete', async (guild) => {
    let model = main_1.Metis.models.guild.findOne({ guildId: guild.id });
    await model.deleteOne();
    if (main_1.Metis.client.user.id === '564472435336806450') {
        main_1.Metis.client.executeWebhook(config.guildWebID, config.guildWebhook, {
            embeds: [{
                    author: { name: 'Removed', icon_url: main_1.Metis.client.user.avatarURL },
                    color: main_1.Metis.colors.red,
                    description: `**ID:** \`${guild.id}\`\n**Name:** \`${guild.name}\`\n**Members:** \`${guild.members.size}\`\n**Owner:** \`${main_1.Metis.util.getFullName(await main_1.Metis.client.getRESTUser(guild.ownerID))}\``,
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
                    author: { name: 'Removed', icon_url: main_1.Metis.client.user.avatarURL },
                    color: main_1.Metis.colors.red,
                    description: `**ID:** \`${guild.id}\`\n**Name:** \`${guild.name}\`\n**Members:** \`${guild.members.size}\`\n**Owner:** \`${main_1.Metis.util.getFullName(await main_1.Metis.client.getRESTUser(guild.ownerID))}\``,
                    timestamp: new Date,
                    footer: { text: `Total Guilds: ${main_1.Metis.client.guilds.size}` }
                }]
        });
    }
});
