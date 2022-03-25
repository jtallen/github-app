const githubClient = require('../src/githubClient');
const constants = require('../src/constants');

// tests for getPullRequests
test('Number of open pull requests should be 2 for turner-site repo', async () => {
  const output = await githubClient.getPullRequests(constants.pullsUrl);
  expect(output.length).toBe(2);
});

test('Author of 2nd open pull request should be jtallen turner-site repo', async () => {
  const output = await githubClient.getPullRequests(constants.pullsUrl);
  expect(output[1].author).toBe('jtallen');
});

test('Number of commits for 2nd open pull request in turner-site repo should be 4', async () => {
  const output = await githubClient.getPullRequests(constants.pullsUrl);
  expect(output[1].commit_count).toBe(4);
});

// test for getPullRequestCommitCount
test('Commit-count for provided test URL should be 4', async () => {
  const output = await githubClient.getPullRequestCommitCount(
    constants.commitsTestUrl
  );
  expect(output).toBe(4);
});