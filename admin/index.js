require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
var qs = require('qs');
const { v1: uuidv1 } = require('uuid');
const crypto = require('crypto');
const axios = require('axios');
const multer = require('multer');
const upload = multer();

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

/**
 * Define parameters
 */
const baseUrl = 'http://localhost:8888/wp-json/gf/v2';
const clientKey = process.env.CLIENT_KEY;
const clientSecret = process.env.CLIENT_SECRET;
const signatureMethod = 'HMAC-SHA1';
const timestamp = Math.floor(Date.now() / 1000);
const nonce = uuidv1();
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

/**
 * Generate OAuth signature
 */
function oauth_signature(method, baseUrl, encodedParams, clientSecret) {
    const encodedUrl = encodeURIComponent(baseUrl);
    const encodedParameters = encodeURIComponent(encodedParams);
    const signatureBaseString = `${method}&${encodedUrl}&${encodedParameters}`;
    const signingKey = `${clientSecret}&`;
    return (oauth_signature = crypto
        .createHmac('sha1', signingKey)
        .update(signatureBaseString)
        .digest()
        .toString('base64'));
}

/**
 * Post to Gravity Forms API
 */
app.post('/submit', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let url = `${baseUrl}/entries?${qs.stringify({
        oauth_consumer_key: clientKey,
        oauth_signature_method: signatureMethod,
        oauth_timestamp: timestamp,
        oauth_nonce: nonce,
        oauth_version: '1.0',
        oauth_signature: encodeURIComponent(
            oauth_signature(
                'POST',
                `${baseUrl}/entries`,
                encodedParameters,
                clientSecret
            )
        ),
    })}`;
    let data = JSON.stringify(req.body);
    let headers = {
        'Content-Type': 'application/json',
    };
    axios
        .post(url, data, { headers: headers })
        .then((response) => res.send(response.data))
        .catch((error) => {
            res.send(error);
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});