const WebSocket = require('ws');

class SocketServer {
    init({ server, path }) {
        this.socket = new WebSocket.Server({ server, path });

        this.socket.on('connection', (connection) => {
            console.log('CONNECT WS');

            connection.on('message', (message) => {
                console.log(message);
            });

            connection.on('error', (err) => {
                console.error(err);
            });

            connection.send(
                JSON.stringify({
                    event: 'update',
                }),
            );
        });
    }

    broadcast(data) {
        const payload = typeof data === 'string' ? data : JSON.stringify(data);
        try {
            this.socket.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(payload);
                }
            });
        } catch (err) {
            console.log('WS broadcasting error');
        }
    }
}

const WSS = new SocketServer();

module.exports = WSS;
