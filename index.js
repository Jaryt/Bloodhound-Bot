const { initSlack } = require('./slack-events.js');

const messageHandler = (event) => {
  console.log(event);

  return 'hello world!';
}

initSlack(messageHandler);  