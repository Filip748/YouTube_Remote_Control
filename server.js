const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('Server WebSocket work at port 8080');

wss.on('connection', (ws) => {
    console.log('New device connected');

    ws.on('message', (message) => {
        const command = message.toString();
        console.log(`got command: ${command}`);

        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(command);
            }
        });
    });

    ws.on('close', () => console.log('device disconnected'));
});