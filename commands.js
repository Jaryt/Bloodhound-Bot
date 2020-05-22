const message = require('./message.js');

const callCommand = (commandName, args, event, state) => {
  let response = `\`Command '${commandName}' does not exist.\``;
  let error = undefined;

  const commands = {
    'sniff': () => {
      try {
        state.target = event.blocks
          .find(element => element.type == 'rich_text').elements
          .find(element => element.type == 'rich_text_section').elements
          .find(obj => obj.type == 'user').user_id;
        response = `sniffing ID ${state.target}`;
      } catch (e) {
        error = `\`\`${e}\`\``;
      }
    },
    'debug': () => {
      if (args.length == 1) {
        let debug = JSON.parse(args[0]);

        if (typeof debug === 'boolean') {
          state.debug = debug;
          response = `set to ${debug}`
        } else {
          error = `expected boolean, got ${typeof debug}`;
        }
      } else {
        error = `expected 1 argument, got ${args.length}`
      }
    },
  }

  if (commands.hasOwnProperty(commandName)) {
    commands[commandName]();
  }

  message(`\`${error ? commandName + ': ' + error : response}\``);

  return state;
}

module.exports = callCommand;