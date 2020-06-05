
const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');

module.exports.initSlack = async (messageHandler) => {
  const slackToken = process.env.SLACK_TOKEN;
  const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
  const port = process.env.PORT || 3000;

  // Init Slack adapters
  const slackEvents = createEventAdapter(slackSigningSecret);
  const server = await slackEvents.start(port);

  console.log(`Listening for events on ${server.address().port}`);

  const client = new WebClient(slackToken);

  slackEvents.on('message', (event) => {
    const response = messageHandler(event);

    if (response) {
      client.chat.postMessage({ text: response, channel: event.channel });
    }
  });

  slackEvents.on('error', (error) => {
    console.log(error);
  });
}
