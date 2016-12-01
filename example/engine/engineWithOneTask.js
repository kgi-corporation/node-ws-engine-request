#!/usr/bin/env node

'use strict';

var wec = require('../../lib');

wec.server({
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
