#!/usr/bin/env node

'use strict';

var restify = require('restify');
var wec = require('../../lib');

let server = restify.createServer({name: 'Restify Example - WebSocket Engine Connection'});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/engine', wec.request('ws://localhost:5000', null, request => {
    return request.data;
}), wec.format);

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});
