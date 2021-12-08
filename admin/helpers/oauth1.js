const crypto = require('crypto');
const encodeParams = require('./encodeParams');

/**
 * Generate OAuth signature
 */
module.exports = function(
    clientKey,
    signatureMethod,
    method,
    url,
    timestamp,
    nonce
) {
    const clientSecret = process.env.CLIENT_SECRET;
    const encodedUrl = encodeURIComponent(url);
    const encodedParameters = encodeURIComponent(
        encodeParams(clientKey, signatureMethod, timestamp, nonce)
    );
    const signatureBaseString = `${method}&${encodedUrl}&${encodedParameters}`;
    const signingKey = `${clientSecret}&`;
    let results = (oauth_signature = crypto
        .createHmac('sha1', signingKey)
        .update(signatureBaseString)
        .digest()
        .toString('base64'));
    return encodeURIComponent(results);
};
