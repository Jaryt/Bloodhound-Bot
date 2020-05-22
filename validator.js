const crypto = require('crypto');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;

let signVerification = (headers, body) => {
  if (headers['x-slack-retry-number']) {
    return;
  }

  let slackSignature = headers['x-slack-signature'];
  let requestBody = JSON.stringify(body);
  let timestamp = headers['x-slack-request-timestamp'];
  let time = Math.floor(new Date().getTime() / 1000);
  if (Math.abs(time - timestamp) > 300) {
    return false;
  }
  if (!slackSigningSecret) {
    return false;
  }
  let sigBasestring = 'v0:' + timestamp + ':' + requestBody;

  let mySignature = 'v0=' +
    crypto.createHmac('sha256', slackSigningSecret)
      .update(sigBasestring, 'utf8')
      .digest('hex');
  if (crypto.timingSafeEqual(
    Buffer.from(mySignature, 'utf8'),
    Buffer.from(slackSignature, 'utf8'))
  ) {
    return true;
  } else {
    return false;
  }
}

module.exports = signVerification;