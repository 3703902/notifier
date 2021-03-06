'use strict';

var crypto = require('crypto');

var D = function(value) {
    var password = process.env.CONFIG_PASSWORD;
    var cipher = crypto.createDecipher('aes256', password);
    if (typeof password == 'undefined' || password.length == 0) {
        throw new Error('No password found in CONFIG_PASSWORD environment variable');
    }
    return Buffer.concat([cipher.update(new Buffer(value, 'base64')), cipher.final()]).toString('utf8');
};

module.exports = {

    // Azure Table Store settings
    azure_storage_account: 'brhnotif',
    azure_storage_access_key: D('e5TyPpEFM6pEhKD9hF80bgV8UzKOtJoRdi9dM1ItjletV5IHe81VYCbZcyhha99hQeKo7X4kb1FR7d8Z6m7bI/tL6Lr6BrI2npI7S91zuApkzoEg1T4u/XLPksmpus9B'),

    // Azure ServiceBus settings
    azure_servicebus_namespace: 'brhnotif',
    azure_servicebus_access_key: D('qs6ExS5Zo/RqWwhLvNVkD3mvPz5YYg/FLx1IuisfCmTnWo9/3pJbf80iTLZi0ACg'),

    // Windows Notification Service (WNS)
    wns_client_secret: D('KXKPDdBkBSb9/yVHbnwErCKCCVvNSpGUBPSL9R/UD0CprifVLiAqVC6jBpx08Bgq'),
    wns_package_sid: D('FjnlNlWjxzX4aHFfGnmjAwIARSj55ptXw2JaNZKBJ/U06fsSlXPMJRHGyT+EUHWsr8MlDNGz2UzWyjr8Gvp6NXeeC2UrDkdLwC4DXliLgWJYyhJfJlfk0zEPYdaRSsRu'),

    // Apple Push Notification Service (APNs)
    'apns_root_certificate_file': 'EntrustRootCertificationAuthority.pem',
    'apns_client_private_key_file': 'apn-nhtest-dev.pem',
    'apns_client_certificate_file': 'apn-nhtest-dev.pem',
    'apns_passphrase': D('eX6nWAK1teqh43k0ibe4DA=='),

    // Google Cloud Messaging (GCM)
    gcm_authorization_key: D('RXW8ftBycIK73IfYdLaDdu2F23BnZaRr113UVB+6GhINwy1f/pRySEgUWBIz25QG')
};
