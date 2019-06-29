'use strict';

async function sendMessage(req, res) {
  console.log('Got request');
  res.status(200).json("Do something...");
}

module.exports = {
  sendMessage
};