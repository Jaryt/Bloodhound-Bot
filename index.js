const { initSlack } = require('./slack-events.js');
const { triggerCommand } = require('./commands.js');
const util = require('util');

const messageHandler = (event) => {
  let state = {
    target: undefined,
    trackSessions: {}
  }

  if (event.text.startsWith('bloodhound')) {
    const args = event.text.split(' ').splice(1);

    [message, state] = triggerCommand(event, args[0], state);

    return message;
  } else if (event.user === state.target) {
    // do things
  } 
  console.log(util.inspect(event, showHidden=false, depth=null, color=true));
}

initSlack(messageHandler);  