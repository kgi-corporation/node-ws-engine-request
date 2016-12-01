# WebSocket Engine Request

When REST endpoint is hit connect to engine/worker server with a WebSocket connection.

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
```

### Restify Example

```javascript
#!/usr/bin/env node

'use strict';

var restify = require('restify');
var wec = require('../../lib');

let server = restify.createServer({name: 'Restify Example - WebSocket Engine Connection'});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/engine', wec.request('ws://localhost:5000', null, null), wec.format);

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});
```

## Change Log

```
0.0.1
- Initial public repository released.
```

## License

See LICENSE.md (MIT)
