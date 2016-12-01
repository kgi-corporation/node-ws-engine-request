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
#!/usr/bin/env node

'use strict';

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

### Restify Example

```javascript
#!/usr/bin/env node

'use strict';

var restify = require('restify');
var wer = require('ws-engine-request');

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

## Change Log

```
0.0.1
- Initial public repository released.
```

## License

See LICENSE.md (MIT)
