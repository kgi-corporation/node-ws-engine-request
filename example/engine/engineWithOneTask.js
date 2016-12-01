#!/usr/bin/env node

'use strict';

var wer = require('../../');

wer.server({
    port: 5000
}, (messageData, callback) => {
    let error = null;
    let data = {
        id: 1,
        title: 'A Random Title'
    };
    let message = null;
    callback(error, data, message);
});
