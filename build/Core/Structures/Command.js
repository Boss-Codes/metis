"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const types_1 = require("../../types");
const main_1 = require("../../main");
class Command {
    constructor(cmd) {
        this.client = main_1.Metis.client;
        this.id = cmd.name ?? "unknown";
        this.name = cmd.name ?? "unknown";
        this.module = cmd.module ?? "Internal";
        this.description = cmd.description ?? "None";
        this.usage = cmd.usage;
        this.example = cmd.example;
        this.permLevel = cmd.permLevel ?? types_1.CommandPermissions["user"];
        this.requiredUsers = cmd.requiredUsers ?? [];
        this.requiredGuilds = cmd.requiredGuilds ?? [];
        this.showOnHelp = cmd.showOnHelp ?? true;
        this.deleteOnUsage = cmd.deleteOnUsage ?? false;
        this.enabled = cmd.enabled ?? true;
        this.aliases = cmd.aliases ?? [];
    }
    async execute(metis, ctx) {
        if (!ctx) {
            return;
        }
        if (!metis.commands) {
            return;
        }
        return new Promise((resolve, reject) => { });
    }
    success(channel, message) {
        if (!channel.permissionsOf(this.client.user.id).has('sendMessages')) {
            return;
        }
        if (message.length > 500) {
            return;
        }
        return channel.createMessage({
            embed: {
                color: main_1.Metis.colors.green,
                description: `${main_1.Metis.emotes.success} ${message}`
            }
        }).catch((error) => { });
    }
    error(channel, message) {
        if (!channel.permissionsOf(this.client.user.id).has('sendMessages')) {
            return;
        }
        if (message.length > 500) {
            return;
        }
        return channel.createMessage({
            embed: {
                color: main_1.Metis.colors.red,
                description: `${main_1.Metis.emotes.error} ${message}`
            }
        }).catch((error) => { });
    }
    info(channel, message) {
        if (!channel.permissionsOf(this.client.user.id).has('sendMessages')) {
            return;
        }
        if (message.length > 500) {
            return;
        }
        return channel.createMessage({
            embed: {
                color: main_1.Metis.colors.blue,
                description: `${main_1.Metis.emotes.info} ${message}`
            }
        }).catch((error) => { });
    }
}
exports.Command = Command;
