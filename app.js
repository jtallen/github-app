const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

let options = {
  headers: { 'user-agent': 'node.js' },
};

const getPullRequests = async () => {
  try {
    let outputArray = [];

    // grab pull requests from GitHub
    let pulls = (
      await axios.get('https://api.github.com/repos/jtallen/turner-site/pulls')
    ).data;

    // alternative: make get requests using Promise.all in order to
    // populate commits array in parallel
    // Promise.all: takes array of promises, executes in parallel
    // returns array of resolved promises once all promises have resolved
    /*const commitsForPulls = await Promise.all(
      pulls.map((pull) => {
        return axios.get(pull.commits_url);
      })
    );*/

    for (let i = 0; i < pulls.length; i++) {
      // destructure pull object to find the subset of fields we need
      outputArray.push(
        (({ id, number, title, user: { login } }) => ({
          id,
          number,
          title,
          author: login,
        }))(pulls[i])
      );

      // add commit count by making another get request
      outputArray[i].commit_count = (
        await axios.get(pulls[i].commits_url)
      ).data.length;

      // from alternative above:
      // outputArray[i].commit_count = commitsForPulls[i].length;
    }

    return outputArray;
  } catch (error) {
    console.error(error);
  }
};

app.get('/', (req, res) => {
  res.header('Content-Type', 'application/json');
  getPullRequests().then((output) => res.send(JSON.stringify(output, null, 2)));
});

app.listen(port, () => {
  console.log(`GitHub App listening on port ${port}`);
});
