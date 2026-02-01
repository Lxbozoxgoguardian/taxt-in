const WebSocket = require("ws");
const http = require("http");

const PORT = process.env.PORT || 8080;

const server = http.createServer();
const wss = new WebSocket.Server({ server });

let messages = [];

wss.on("connection", (ws) => {
  console.log("Client connected");

  // send old messages
  messages.forEach(msg => ws.send(msg));

  ws.on("message", (data) => {
    const msg = data.toString();
    messages.push(msg);

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});