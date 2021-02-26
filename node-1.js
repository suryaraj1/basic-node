/* eslint-disable no-console */
const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 8000;

const respondText = (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello');
};

const respondJson = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ text: 'hello', nums: [1, 2, 3, 4] }));
};

const respondNotFound = (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
};

const respondStatic = (req, res) => {
    const filename = `${__dirname}/public${req.url.split('/static')[1]}`;
    fs.createReadStream(filename)
        .on('error', () => respondNotFound(req, res))
        .pipe(res);
};

const server = http.createServer((req, res) => {
    if (req.url === '/') return respondText(req, res);
    if (req.url === '/json') return respondJson(req, res);
    if (req.url.match(/^\/static/)) return respondStatic(req, res);

    respondNotFound(req, res);
});

server.listen(port);
console.log(`Server is listening to port ${port}`);
