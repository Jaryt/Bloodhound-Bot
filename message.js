const https = require('https');
const webhookURL = process.env.WEBHOOK_URL;

const promiseMessage = async (webhookURL, messageBody) => {
    try {
        messageBody = JSON.stringify(messageBody);
    } catch (e) {
        throw new Error('Failed to stringify messageBody', e);
    }

    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(webhookURL, requestOptions, (res) => {
            let response = '';


            res.on('data', (d) => {
                response += d;
            });

            res.on('end', () => {
                resolve(response);
            })
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.write(messageBody);
        req.end();
    });
}

module.exports = async (text) => {
    if (!webhookURL) {
        console.error('No webhook URL');
    }

    console.log('Sending slack message');
    try {
        const slackResponse = await promiseMessage(webhookURL, { 'text': text });
        console.log('Message response', slackResponse);
    } catch (e) {
        console.error('There was a error with the request', e);
    }
};