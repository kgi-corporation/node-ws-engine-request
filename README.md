# WebSocket Engine Request

When REST endpoint is hit connect to engine/worker server with a WebSocket connection.

[![CircleCI](https://circleci.com/gh/kgi-corporation/node-ws-engine-request.svg?style=shield)](https://circleci.com/gh/kgi-corporation/node-ws-engine-request)
[![npm version](https://badge.fury.io/js/ws-engine-request.svg)](https://badge.fury.io/js/ws-engine-request)

## Install

```
npm install ws-engine-request --save
```

## Development

```
npm run-script build
```

## Examples

### Single Task Server Example

```javascript
var wer = require('ws-engine-request');

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
```

```
kgilbert-mac:ws-engine-request kgilbert$ node example/engine/engineWithOneTask.js 
Thu Dec 01 2016 10:08:49 GMT-0600 (CST) - WebSocket connection closed
Thu Dec 01 2016 10:08:53 GMT-0600 (CST) - WebSocket connection closed
Thu Dec 01 2016 10:08:54 GMT-0600 (CST) - WebSocket connection closed
```

### Multi Task Server Example

```javascript
var wer = require('ws-engine-request');

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

```

### Restify Example

```javascript
var wer = require('ws-engine-request');
var restify = require('restify');

let server = restify.createServer({name: 'Restify Example - WebSocket Engine Connection'});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/engine', wer.request('ws://localhost:5000', null, null), wer.format);

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});
```

```
kgilbert-mac:ws-engine-request kgilbert$ node example/api/restify.js 
Restify Example - WebSocket Engine Connection listening at http://[::]:8080
Thu Dec 01 2016 10:08:49 GMT-0600 (CST) - WebSocket connection closed
Thu Dec 01 2016 10:08:53 GMT-0600 (CST) - WebSocket connection closed
Thu Dec 01 2016 10:08:54 GMT-0600 (CST) - WebSocket connection closed
```

## Functions

<dl>
<dt><a href="#server">server([config], tasks)</a></dt>
<dd><p>Creates a new webSocket server instance with tasks</p>
</dd>
<dt><a href="#request">request(socketUrl, task, sendDataFormat)</a> ⇒ <code>function</code></dt>
<dd><p>Make engine request in restify application as middleware</p>
</dd>
<dt><a href="#format">format(request, response, next)</a></dt>
<dd><p>Suggested format for api response</p>
</dd>
</dl>

<a name="server"></a>

## server([config], tasks)
Creates a new webSocket server instance with tasks

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [config] | <code>Object</code> | Configuration object container |
| [config.port] | <code>Number</code> | Port for WebSocket server to listen on |
| [config.name] | <code>String</code> | Name of engine for logging and responses |
| tasks | <code>Object</code> &#124; <code>function</code> | Container for task instructions |

<a name="request"></a>

## request(socketUrl, task, sendDataFormat) ⇒ <code>function</code>
Make engine request in restify application as middleware

**Kind**: global function  
**Returns**: <code>function</code> - - Restify middleware  

| Param | Type | Description |
| --- | --- | --- |
| socketUrl | <code>String</code> | WebSocket server connection url |
| task | <code>String</code> | specific task on the engine to perform |
| sendDataFormat | <code>function</code> | Passes in request object, should return data to send to engine |

<a name="format"></a>

## format(request, response, next)
Suggested format for api response

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>Object</code> | restify request container |
| request.engine | <code>Object</code> | engine response container |
| request.engine.error | <code>Boolean</code> | if engine had error processing request |
| request.engine.data | <code>Object</code> | response data from engine |
| request.engine.message | <code>String</code> | message if engine sent any |
| response | <code>Object</code> | restify |
| next | <code>function</code> | restify next method |


## Change Log

```
0.2.0
- Initial public release.
```

## License

See LICENSE.md (MIT)
