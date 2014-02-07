'use strict';

/**
 * @fileOverview Defines the Google Cloud Messaging (GCM) interface prototype and its methods.
 */
module.exports = GCM;

var config = require("./config");
var request = require("request");

/**
 * GCM constructor.
 *
 * @class
 *
 * A GCM object sends JSON payloads to a GCM server for delivery to a specific Android device.
 */
function GCM() {
    this.log = config.log('GCM');
    this.connection = null;
    this.authorizationKey = 'key=' + config.gcm_authorization_key;
}

/**
 * GCM prototype.
 *
 * Defines the methods available to a GCM instance.
 */
GCM.prototype = {

    /**
     * Send a notification to a client via GCM. See http://developer.android.com/guide/google/gcm/gcm.html
     *
     * @param {NotificationRequest} request the request to send out
     */
    sendNotification: function(req) {
        var log = this.log.child('sendNotification');
        log.BEGIN(req);

        var content = null;
        try {
            // Convert the notification payload into a Javascript object.
            content = JSON.parse(req.content);
        }
        catch (err) {
            log.error('failed to parse GCM payload:', req.content);
            log.END();
            return;
        }

        // Add the device-specific address to the payload before sending.
        content.registration_ids = [req.token];
        log.debug(content);

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': this.authorizationKey
        };

        log.debug(headers);

        request(
            {
                'method': 'POST',
                'uri': config.gcm_uri,
                'body': JSON.stringify(content),
                'headers': headers
            },
            function(err, resp, body) {
                if (err !== null) {
                    log.error("POST error:", err);
                }
                else {
                    log.info('POST response:', resp.statusCode);
                    log.info('BODY:', body);
                }
                log.END();
            }
        );
    }
};