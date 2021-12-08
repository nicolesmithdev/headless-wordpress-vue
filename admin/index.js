require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const { v1: uuidv1 } = require('uuid');
const axios = require('axios');
const multer = require('multer');
const upload = multer();
const buildUrl = require('./helpers/buildUrl');

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

/**
 * Post to Gravity Forms API
 */
app.post('/submit', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let url = buildUrl('POST', 'entries', uuidv1());
    let data = JSON.stringify(req.body);
    let headers = {
        'Content-Type': 'application/json',
    };

    axios
        .post(url, data, { headers: headers })
        .then(async (submitResponse) => {
            let formId = submitResponse.data.form_id;
            await axios
                .get(buildUrl('GET', `forms/${formId}`, uuidv1()))
                .then((response) => {
                    // console.log('notificaitons', response.data.notifications);
                    // console.log('confirmations', response.data.confirmations);
                    res.send(response.data.confirmations);
                })
                .catch((fooError) => {
                    res.send(fooError);
                });
        })
        .catch((error) => {
            res.send(error);
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
