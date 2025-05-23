var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebSocketServer } from 'ws';
import http from 'http';
import generateSuggestion from './api/generateSuggestions/index.js';
const server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("hi there");
});
// generateSuggestion("i need a refund ")
// this websocket server is going to update the github copilot instance real time !
const wss = new WebSocketServer({ server });
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data, isBinary) {
        return __awaiter(this, void 0, void 0, function* () {
            // wss.clients.forEach( async function each(client) {
            // if (client.readyState === WebSocket.OPEN) {
            // Now you can use await here
            const decodedMessage = data.toString("utf-8");
            console.log("raw data ws sends ", decodedMessage);
            const suggestionsJson = yield generateSuggestion(decodedMessage);
            console.log("suggestionsJson", suggestionsJson);
            ws.send(JSON.stringify(suggestionsJson));
            // }
        });
    });
    // });
    ws.send('Hello! Message From Server!!');
});
server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});
