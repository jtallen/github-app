const axios = require('axios');

/**
 * Places a get request to the provided GitHub Pulls API route
 * filters desired information (placing additional request for commits) and
 * returns the desired array of objects corresponding to open pull requests
 *
 * @param   {String}  pullsUrl  GitHub Pulls API route -
 **   In format: https://api.github.com/repos/{user}/{repo}/pulls
 * @return  {Promise}           A Promise that resolves to an
 **   array containing objects built from open Pull Requests
 */
const getPullRequests = async (pullsUrl) => {
  try {
    let outputArray = [];

    // grab pull requests from GitHub
    let pulls = (await axios.get(pullsUrl)).data;

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
      // destructure pull object to use the subset of fields we need
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

exports.getPullRequests = getPullRequests;
