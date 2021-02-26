/* eslint-disable no-console */
const http = require('http');
const querystring = require('querystring');
// both http and querystring are core modules
// core = pre installed in node.js

const port = process.env.PORT || 1337;

// basic routing
const respondText = (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello');
};

const respondJson = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ text: 'hello JSON', nums: [2, 3, 5, 7, 11] }));
};

const respondNotFound = (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
};

const respondEcho = (req, res) => {
    const { input = '' } = querystring.parse(req.url.split('?').slice(1).join(''));

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        normal: input,
        shouty: input.toUpperCase();
        characterCount: input.length,
        backwards: input.split(' ').reverse().join('')
    }))
};

const server = http.createServer((req, res) => {
    if (req.url === '/') return respondText(req, res);
    if (req.url === '/json') return respondJson(req, res);
    if (req.url.match(/^\/echo/)) return respondEcho(req, res);
    respondNotFound(req, res);
});

server.listen(port);
console.log(`Server listening on port ${port}`);
