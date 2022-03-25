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
    const outputArray = [];

    // grab pull requests from GitHub
    const pullsResponse = await axios.get(pullsUrl);
    const pulls = pullsResponse.data;

    // fetch commit counts in parallel
    const commitCounts = await Promise.all(
      pulls.map((pull) => getPullRequestCommitCount(pull.commits_url))
    );

    for (let i = 0; i < pulls.length; i++) {
      // destructure pull object to use the subset of fields we need
      const { id, number, title, user } = pulls[i];

      // map pull fields to expected output fields
      const output = {
        id,
        number,
        title,
        author: user.login,
        commit_count: commitCounts[i],
      };

      // finally, add output to output array
      outputArray.push(output);
    }

    return outputArray;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Makes a get request to the provided GitHub Pulls/Commits API route
 * return number of commits for corresponding Pull Request
 *
 * @param   {String}  commitsUrl  GitHub Pulls/Commits API route
 * @return  {Promise}             A Promise that resolves to a number
 */
const getPullRequestCommitCount = async (commitsUrl) => {
  try {
    const commits = await axios.get(commitsUrl);

    return commits.data.length;
  } catch (error) {
    console.error(error);
  }
};

exports.getPullRequests = getPullRequests;
exports.getPullRequestCommitCount = getPullRequestCommitCount;
