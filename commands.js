const { startTracking } = require('./tracking.js')

const triggerCommand = (event, command, state) => {
  const commands = {
    sniff: () => {
      if (state.target) {
        return 'Already have a scent. Please reset first.'
      }

      try {
        const target = event.blocks
          .find(element => element.type == 'rich_text').elements
          .find(element => element.type == 'rich_text_section').elements
          .find(obj => obj.type == 'user').user_id;

        state.target = target;

        return `Scent picked up for ${target}`;
      } catch (e) {
        console.log('error', e, event);

        return 'No scent was picked up!';
      }
    },
    reset: () => {
      state = {};

      return 'Reset bloodhound tracking.'
    },
    ping: () => {
      return 'pong';
    },
    track: () => {
      if (state.trackSessions[arg, event.user]) {
        return 'Tracking session already exists for this user';
      } 
      
      state.trackSessions[arg, event.user] = 'hello';
      return state.trackSessions[123, event.user];
    },
    complete: () => {

    }
  }

  const trigger = commands[command];

  if (trigger) {
    return ['```event```', state];
  } else {
    return [`Command ${command} does not exist`, state];
  }
}

/*
 client_msg_id: 'c848eda9-358c-4d50-bab9-afdeebf9b0c3',
  type: 'message',
  text: 'track <@U0JJLJEBC>',
  user: 'US57UDJJY',
  ts: '1591323647.065200',
  team: 'T02519B3Z',
  blocks: [
    {
      type: 'rich_text',
      block_id: '=eaC',
      elements: [
        {
          type: 'rich_text_section',
          elements: [
            { type: 'text', text: 'track ' },
            { type: 'user', user_id: 'U0JJLJEBC' }
          ]
        }
      ]
    }
  ],
  channel: 'G013WB1P3C6',
  event_ts: '1591323647.065200',
  channel_type: 'group'
}
*/


module.exports = { triggerCommand };