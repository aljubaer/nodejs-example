/*jshint esversion: 6 */

const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
const server = createServer();

server.lister(port);