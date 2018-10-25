const amqp = require('amqplib');
const http = require('http');
const _ = require('lodash');

const ws = require('./websocket');

const addresses = ['2MwcVyhWzUrS6AK8mwAZPjBfeQqtdEGgeSg',
    '2NE7cEdVPFPrVviMvnQYGiNfeTMZnokHu23',
    '2MtcSCijSWDruTq316PNV8onKzeq4amMPb3',
    '2N2u2dMHKr4B7CMPQNptxEqrGWu9fVfCA5m',
    '2N2C6oBBvrC8Kan4bREcvPQHLUE9FpgCY6g',
];

const server = http.createServer();
ws.init({ server, path: '/ws' });
const port = 3000;
server.listen(port);

server.on('listening', () => {
    console.log(`Server listening on ${port} port`);
});

const rabbitHost = process.env.RABBIT_HOST || 'localhost';

const queueName = 'transaction';

amqp.connect(`amqp://user:pass@${rabbitHost}/vhost`)
.then((connection) => connection.createChannel(connection))
.then((channel) => {
    return channel.assertQueue(queueName).then(() => {
        return channel.consume(queueName, (msg) => {
            if (msg === null) {
                return;
            }
            const transaction = JSON.parse(msg.content.toString());
            const outs = _.filter(transaction.out, (out) => _.includes(addresses, out.addr));
            const transactionAmount = _.reduce(outs, (acc, out) => {
                return acc + out.value;
            }, 0);

            const tokenAmount = (transactionAmount / 100000000) * 10;

            const response = Object.assign({}, transaction, {tokenAmount});
            console.log(response);
            ws.broadcast(response);
            channel.ack(msg);
        });
    });
}).catch(console.warn);
