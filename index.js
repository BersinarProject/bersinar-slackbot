require('dotenv').config()
const cron = require('node-cron');
const axios = require('axios');
const http = require('http');

const hostname = '127.0.0.1';
const port = process.env.PORT || '3001';
const URL_SLACK = process.env.URL_SLACK || 'https://hooks.slack.com/services/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';
const CRON = process.env.CRON || '* * * * *';

const msg = {
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Hello all, please update and report what you have done yesterday and what are you planning for today! You can copy the format below to write your report. :wink:\n\nExample\n>*What I've done:*\n>- Start working on about us section\n>\n>*Issues/Problems:*\n>- Issues in ssh gitlab\n>- Indihome down\n>\n>*What I am planning to do:*\n>- Continue about us section"
      }
    }
  ]
}

cron.schedule(CRON, () => {
  sendMessage()
});


function sendMessage() {
  axios.post(
    URL_SLACK,
    msg
  )
  .then(function (response) {
    console.log(response.statusText);
  })
  .catch(function (error) {
    console.log(error);
  });
}


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('[bot-report] OK');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
