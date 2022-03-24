const pullRequests = require('../src/getPullRequests');
const constants = require('../constants/data');

// tests for getPullRequests
test('Number of open pull requests should be 2 for turner-site repo', (done) => {
  pullRequests.getPullRequests(constants.pullsUrl).then((output) => {
    expect(output.length).toBe(2);
    done();
  });
});

test('Author of 2nd open pull request should be jtallen turner-site repo', (done) => {
  pullRequests.getPullRequests(constants.pullsUrl).then((output) => {
    expect(output[1].author).toBe('jtallen');
    done();
  });
});

test('Number of commits for 2nd open pull request should be', (done) => {
  pullRequests.getPullRequests(constants.pullsUrl).then((output) => {
    expect(output[0].commit_count).toBe(4);
    done();
  });
});
