'use strict';

const config = require('../../config');
const client = require('twilio')(config.accountSid, config.authToken);
const Quote = require('inspirational-quotes');

async function sendMessage(req, res) {
  const request = req.swagger.params.request.value;
  console.log('Got request', request);

  const quote = Quote.getRandomQuote();
  console.log('Sending', quote);

  client.messages
  .create({
     body: quote,
     from: config.sendingNumber,
     to: request.targetNumber
   })
  .then(message => console.log(message.sid));
  res.status(200).json("Message sent!");
}

module.exports = {
  sendMessage
};