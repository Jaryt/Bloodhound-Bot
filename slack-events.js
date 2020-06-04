
const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');

module.exports.initSlack = async (messageHandler) => {
  const slackToken = process.env.SLACK_TOKEN;
  const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
  const port = process.env.PORT || 3000;

  // Init Slack adapters
  const slackEvents = await createEventAdapter(slackSigningSecret).start(port);
  const client = new WebClient(slackToken);

  slackEvents.on('message', (event) => {
    const response = messageHandler(event);

    if (response) {
      await client.chat.postMessage({ text: response, channel: event.channel });
    }
  });
}
