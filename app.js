const express = require('express');
const axios = require('axios');

const constants = require('./constants/data');
const pullRequests = require('./src/getPullRequests');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.header('Content-Type', 'application/json');
  pullRequests
    .getPullRequests(constants.pullsUrl)
    .then((output) => res.send(JSON.stringify(output, null, 2)));
});

app.listen(port, () => {
  console.log(`GitHub App listening on port ${port}`);
});
