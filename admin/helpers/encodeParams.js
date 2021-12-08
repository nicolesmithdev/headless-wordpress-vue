module.exports = function(clientKey, signatureMethod, timestamp, nonce) {
    const parameters = {
        oauth_consumer_key: clientKey,
        oauth_signature_method: signatureMethod,
        oauth_timestamp: timestamp,
        oauth_nonce: nonce,
        oauth_version: '1.0',
    };

    /**
     * Encode parameters
     */
    let ordered = {};
    Object.keys(parameters)
        .sort()
        .forEach(function(key) {
            ordered[key] = parameters[key];
        });
    let encodedParameters = '';
    for (let k in ordered) {
        const encodedValue = escape(ordered[k]);
        const encodedKey = encodeURIComponent(k);
        if (encodedParameters === '') {
            encodedParameters += encodeURI(`${encodedKey}=${encodedValue}`);
        } else {
            encodedParameters += encodeURI(`&${encodedKey}=${encodedValue}`);
        }
    }

    return encodedParameters;
};
