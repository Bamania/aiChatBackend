import { WebSocketServer } from 'ws';
import http from 'http';
import generateSuggestion from './api/generateSuggestions/index'; // Remove .js extension

const server = http.createServer(function(request: any, response: any) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("hi there");
});
// generateSuggestion("i need a refund ")
// this websocket server is going to update the github copilot instance real time !
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message',  async function message(data, isBinary) {
    // wss.clients.forEach( async function each(client) {
      // if (client.readyState === WebSocket.OPEN) {
        // Now you can use await here
        const decodedMessage = data.toString("utf-8");
        console.log("raw data ws sends ",decodedMessage)

        const suggestionsJson = await generateSuggestion(decodedMessage);
        console.log("suggestionsJson",suggestionsJson)
        ws.send(JSON.stringify(suggestionsJson));
      // }
    });
  // });

  ws.send('Hello! Message From Server!!');
});


server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});