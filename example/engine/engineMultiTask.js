#!/usr/bin/env node

'use strict';

var wer = require('../../');

var config = {
    port: 5000
};

var tasks = {
    text: text,
    number: number
};

wer.server(config, tasks);

function text (messageData, callback) {
    var error = null;
    var data = null;
    var message = 'Some Text';
    callback(error, data, message);
}

function number (messageData, callback) {
    var error = null;
    var data = null;
    var message = Math.floor(Math.random());
    callback(error, data, message);
}
