/**
 * Avrae Middle Man - Click a button, get a message.
 */

//Config Information
const path = require('path'),
    os = require('os');

const low = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    adapter = new FileSync(path.join(os.tmpdir(), 'config.json')),
    config = low(adapter);

config.defaults({
    prefix: '+',
    channels: []
}).write();

//Bot Code
var Discordie = require("discordie");
var Events = Discordie.Events;

var prefix = config.get('prefix').value();

var client = new Discordie();

client.connect({
    token: require('./auth').token
});

//Bot message handler
client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    //help
    if (e.message.content == prefix + "help") {
        e.message.channel.sendMessage(`Link: https://amm.sturgess.co\nHelp: ${prefix}help\nAdd a Channel: ${prefix}channel add\nRemove a Channel: ${prefix}channel remove`);
    }

    //channel add
    if (e.message.content == prefix + "channel add") {
        var channelExits = config.get('channels').find({
            id: e.message.channel.id
        }).value();

        if (!channelExits) {
            config.get('channels').push({
                id: e.message.channel.id,
                name: e.message.channel.name
            }).write();
            e.message.channel.sendMessage(e.message.channel.name + " has been added.");
        } else {
            e.message.channel.sendMessage(e.message.channel.name + " has already been added.");
        }
    }

    //channel remove
    if (e.message.content == prefix + "channel remove") {
        var channelExists = config.get('channels').find({
            id: e.message.channel.id
        }).value();

        if (channelExists) {
            config.get('channels').remove({
                id: e.message.channel.id
            }).write();
            e.message.channel.sendMessage(e.message.channel.name + " has been removed.");
        } else {
            e.message.channel.sendMessage(e.message.channel.name + " has not been added.");
        }
    }
});

//Bot connected
client.Dispatcher.on(Events.GATEWAY_READY, e => {
    console.log('Bot connected successfully, starting web server.');
    require(path.join(__dirname, 'web.js'))(config, client);
});