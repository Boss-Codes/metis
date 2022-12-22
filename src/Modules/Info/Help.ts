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
        
        const error = {
            embeds: [{
                color: metis.colors.red,
                description: `${metis.emotes.error} I could not find that command or module.`,
            }],
            flags: 64,
            components: [{
                type: 1,
                components: [{
                    type: 2,
                    style: 5,
                    label: "Command List",
                    url: 'https://github.com/Boss-Codes/metis-ts/wiki/Commands' 
                }, 
                {
                    type: 2, 
                    style: 5, 
                    label: 'Support Server', 
                    url: 'https://discord.gg/mePghx6dQy'
                }],
            }],
        }
        const foundCommand = metis.commands.get(ctx.args.join(' ')); 
        const foundModule = metis.commands.filter(r => r.module === ctx.args.join(' '))
        if (!foundModule) {return ctx.channel.createMessage(error)}

    }
}
module.exports.cmd = Help;