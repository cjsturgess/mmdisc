/**
 * AMM Web Request Handler
 */
module.exports = (config, client) => {
    var express = require('express'),
        app = express();

    //Serve static files.
    app.use('/', express.static(__dirname + '/public'));

    //Send command or text.
    app.get('/cmd/:cmd', (req, res) => {
        //If no command provided or command doesn't start with $, fail.
        if (!req.params.cmd || req.params.cmd == '' || req.params.cmd.substring(0, 1) != "$") {
            res.json({
                success: false
            });
            return;
        }

        //Send message to discord chat.
        var cmd = req.params.cmd,
            channels = config.get('channels').value();

        channels.forEach((c) => {
            client.Channels.get(c.id).sendMessage(cmd);
            res.json({
                success: true
            });
        });

    });

    //Start listening for requests.
    app.listen(5000, () => {
        console.log('Web Server Running.');
    });
}