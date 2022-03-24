# github-app

Simple Node/Express server that uses GitHub APIs to return specific information on pull requests.

Currently only hits my [portfolio site](https://github.com/jtallen/turner-site); however, extensions for user input and a UI are possible.

## Tech Stack

- Node.js backend with [Express](https://expressjs.com/) framework.
- [Axios](https://axios-http.com/) - Promise and HTTP library.
- [Jest](https://jestjs.io/) for testing.

## Usage

Clone the project using

```
git clone https://github.com/jtallen/github-app.git
```

Install dependencies using

```
npm install
```

Start local server using

```
node app.js
```

After starting server, hit endpoint by visiting [localHost](http://localhost:3000/)

### Testing

Run tests by using

```
npm test
```
