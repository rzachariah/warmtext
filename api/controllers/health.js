'use strict';

function checkHealth(req, res) {
  const healthyStatus = {
    status: "UP"
  };
  res.status(200).json(healthyStatus);
}

module.exports = {
  checkHealth
};