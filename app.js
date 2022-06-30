const http = require('http');
const busboy = require('connect-busboy');
const createError = require('http-errors');

const express = require('express');
const routes = require('./routes');
const {cleanTempFolder} = require('./utils');

const app = express();
app.use(busboy());
app.use('/', routes);
app.use((request, response, next) => {
    next(createError(404));
});
app.use((error, request, response, next) => {
    response.header('Content-Type', 'text/plain')
    response.status(error.status || 500);
    response.send(error.message);
});

for (const arg of process.argv) {
    if (arg === '--clean-temp') cleanTempFolder();
}

const server = http.createServer(app);
server.listen(3000);