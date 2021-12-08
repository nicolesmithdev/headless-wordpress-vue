var qs = require('qs');
const oauthhelper = require('./oauth1');

module.exports = function(method, endpoint, nonce) {
    const baseUrl = 'http://localhost:8888/wp-json/gf/v2';
    const url = `${baseUrl}/${endpoint}`;
    const clientKey = process.env.CLIENT_KEY;
    const signatureMethod = 'HMAC-SHA1';
    const timestamp = Math.floor(Date.now() / 1000);

    return `${url}?${qs.stringify({
        oauth_consumer_key: clientKey,
        oauth_signature_method: signatureMethod,
        oauth_timestamp: timestamp,
        oauth_nonce: nonce,
        oauth_version: '1.0',
        oauth_signature: oauthhelper(
            clientKey,
            signatureMethod,
            method,
            url,
            timestamp,
            nonce
        ),
    })}`;
};
