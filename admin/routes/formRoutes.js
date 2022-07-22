const axios = require('axios');
const buildUrl = require('../helpers/buildUrl');
const { v1: uuidv1 } = require('uuid');

module.exports = (app) => {
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
                    .then(() => {
                        // const transporter = nodemailer.createTransport({
                        //     service: 'gmail',
                        //     auth: {
                        //         user: 'youremail@gmail.com',
                        //         pass: 'yourpassword',
                        //     },
                        // });
                        const transport = nodemail.createTransport(
                            nodemailerSendgrid({
                                apiKey: process.env.SENDGRID_API_KEY,
                            })
                        );

                        const mailOptions = {
                            from: 'youremail@gmail.com',
                            to: 'myfriend@yahoo.com',
                            subject: 'Sending Email using Node.js',
                            text: 'That was easy!',
                        };

                        transporter.sendMail(mailOptions, function(
                            error,
                            info
                        ) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    })
                    .catch((fooError) => {
                        res.send(fooError);
                    });
            })
            .catch((error) => {
                res.send(error);
            });
    });
};
