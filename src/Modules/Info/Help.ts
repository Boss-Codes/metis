import {Command} from "../../Core/Structures/Command";
import {ICommandContext, MetisInterface, CommandPermissions} from "../../types";

class Help extends Command { 
    constructor(){
        super({
            name: 'help', 
            module: 'Info', 
            description: 'Lists the bot\'s commands or gives information on a specific command.', 
            usage: '[command name]', 
            example: 'serverinfo', 
            requiredGuilds: [], 
            requiredUsers: [], 
            deleteOnUsage: false, 
            showOnHelp: true, 
            permLevel: CommandPermissions['user'], 
            enabled: true, 
            aliases: []
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext): Promise<any> {
        // our specific commands 

        if (!ctx.args){return ctx.channel.createMessage('**Commands List**\n <https://github.com/Boss-Codes/metis-ts/wiki/Commands>\n\n**Bot Support Server**\nhttps://discord.gg/mePghx6dQy')}

        const errorEmbed = { 
            color: metis.colors.red, 
            description: `${metis.emotes.error} I cannot find that command or module.`
        }
        
        const autoroles_notWorking_menu = {
            embeds: [{
                color: metis.colors.default,
                description: "Insert troubleshooting steps here",
            }],
            flags: 64,
            components: [{
                type: 1,
                components: [{
                    type: 2,
                    custom_id: "addSup",
                    style: 4,
                    label: "Additional Support",
                        
                }],
            }],
        }
        ctx.channel.createMessage(autoroles_notWorking_menu)
    }
}
module.exports.cmd = Help;