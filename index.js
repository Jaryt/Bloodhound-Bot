const { initSlack } = require('./slack-events.js');
const { triggerCommand } = require('./commands.js');
const util = require('util');

const beginSession = () => {
  let state = {
    target: undefined,
    trackSessions: {}
  }

  return (event) => {
    if (event.text.startsWith('bloodhound')) {
      const args = event.text.split(' ').splice(1);

      [message, newState] = triggerCommand(event, args[0], state);
      state = newState;

      return message;
    } else if (event.user === state.target) {
      return `\`\`\`${util.inspect(event, showHidden=false, depth=null)}\`\`\``
    }

    console.log(util.inspect(event, showHidden = false, depth = null, color = true));
  }
}

initSlack(beginSession());  