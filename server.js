const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
let messages = []; // stores chat history

wss.on("connection", (ws) => {
  console.log("Client connected");

  // send old messages to new client
  messages.forEach(msg => ws.send(msg));

  ws.on("message", (data) => {
    const msg = data.toString();
    messages.push(msg);

    // broadcast to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});

console.log("Server running on ws://localhost:8080");