'use strict';

import WebSocket from 'ws';
import _ from 'lodash';

const WebSocketServer = WebSocket.Server;

/**
 * Creates a new webSocket server instance with tasks
 * @param {Object} [config] - Configuration object container
 * @param {Number} [config.port] - Port for WebSocket server to listen on
 * @param {String} [config.name] - Name of engine for logging and responses
 * @param {(Object|Function)} tasks - Container for task instructions
 */
export function server (config, tasks) {
    return new WebSocketServer({
        name: config.name || 'Engine',
        port: config.port || 5000
    }).on('connection', ws => {
        ws.on('message', rawMessage => {
            let message;
            try {
                message = JSON.parse(rawMessage)
            } catch (e) {
                return ws.send(JSON.stringify({
                    error: true,
                    data: {},
                    message: 'JSON sent through connection could not be parsed.'
                }));
            }
            let data = message.data;
            let task;
            if(_.isFunction(tasks)){task = tasks;}
            else {task = _.get(tasks, message.task);}
            if(_.isFunction(task)){
                task(data, (error, data, message) => {
                    ws.send(JSON.stringify({
                        error: error,
                        data: data,
                        message: message
                    }));
                    ws.close(1000); // CLOSE_NORMAL
                });
            } else {
                ws.send(JSON.stringify({
                    error: true,
                    data: {},
                    message: 'Invalid task provided to '+config.name+'.'
                }));
                ws.close(1003); // CLOSE_UNSUPPORTED
            }
        }).on('close', () => {
            console.log('%s - WebSocket connection closed', new Date());
        });
    });
}

/**
 * Make engine request in restify application as middleware
 * @param {String} socketUrl - WebSocket server connection url
 * @param {String} task - specific task on the engine to perform
 * @param {Function} sendDataFormat - Passes in request object, should return data to send to engine
 * @returns {Function} - Restify middleware
 */
export function request (socketUrl, task, sendDataFormat) {
    return function (req, res, next) {
        let ws = new WebSocket(socketUrl);
        let getData = () => {
            if(_.isFunction(sendDataFormat)) return sendDataFormat(req);
            return req.data;
        };
        ws.on('open', function open() {
            ws.send(JSON.stringify({
                task: task,
                data: getData()
            }));
        });
        ws.on('message', function(rawMessage, flags) {
            let message;
            try {
                message = JSON.parse(rawMessage);
            } catch (e) {
                message = {
                    error: true,
                    data: null,
                    message: 'Error parsing JSON returned from connection'
                };
            }
            _.set(req, 'engine.error', _.get(message, 'error'));
            _.set(req, 'engine.message', _.get(message, 'message'));
            _.set(req, 'engine.data', _.get(message, 'data'));
            _.set(req, 'engine.flags', flags);
            ws.close(1000);
            next();
        });
        ws.on('close', () => {
            console.log('%s - WebSocket connection closed', new Date());
        });
    };
}

/**
 * Suggested format for api response
 * @param {Object} request - restify request container
 * @param {Object} request.engine - engine response container
 * @param {Boolean} request.engine.error - if engine had error processing request
 * @param {Object} request.engine.data - response data from engine
 * @param {String} request.engine.message - message if engine sent any
 * @param {Object} response - restify
 * @param {Function} next - restify next method
 */
export function format (request, response, next) {
    response.send({
        error: _.get(request, 'engine.error'),
        data: _.get(request, 'engine.data'),
        message: _.get(request, 'engine.message')
    });
    next();
}
