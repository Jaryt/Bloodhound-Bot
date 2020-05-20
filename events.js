const validate = require('./validator.js');
const message = require('./message.js');

module.exports.message = (request, response, callback) => {
    const body = JSON.parse(request.body);

    if (validate(request.headers, body)) {
        if (!body.event.bot_id) {
            message('hello person!');
        }
    }

    callback(null);
};