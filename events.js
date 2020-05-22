const validate = require('./validator.js');
const message = require('./message.js');
const callCommands = require('./commands.js');

const util = require('util');
const AWS = require('aws-sdk');

const bucketParams = { Bucket: 'bloodhound-state', Key: 'state.json' };
const s3 = new AWS.S3();

const getState = async () => {
  try {
    let state = await s3.getObject(bucketParams).promise();

    message(state);

    return state;
  } catch (e) {
    message(`\`\`\`Could not get state:\n${e}\`\`\``);
  }
}

const putState = (state) => {
  let data = {
    ...bucketParams,
    Body: JSON.stringify(state), ContentType: "application/json"
  };

  s3.putObject(data, state);
}

module.exports.message = async (request, response, callback) => {
  const body = JSON.parse(request.body);

  if (validate(request.headers, body)) {
    if (body.type == 'url_verification') {
      callback(null, body.challenge);
    } else {
      const event = body.event;

      if (!event.bot_id) {
        let state = JSON.parse((await getState()).Body.toString('utf-8'));

        if (event.text.startsWith('bloodhound')) {
          const args = event.text.split(' ');

          state = callCommands(args[1], args.splice(2), event, state);
        }

        if (state.debug) {
          const stateContents = util.inspect(state, showHidden = false, depth = null);
          const eventContents = util.inspect(event, showHidden = false, depth = null);

          message(`\`\`\`state:\n${stateContents}\nevent:\n${eventContents}\n\`\`\``);
        }

        putState(state);
      } else {

      }
    }
  }

  callback(null);
};