/* eslint-disable no-console */
const http = require('http');

const port = process.env.PORT || 1337;

// now the server responds with an API
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ text: 'hi', primes: [2, 3, 5, 7] }));
});

server.listen(port);
console.log(`Server listening on port ${port}`);
