const rabbitJs = require('rabbit.js');
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

const context = rabbitJs.createContext('amqp://user:pass@rabbit/vhost');

context.on('ready', function() {
    const sub = context.socket('SUB');
    sub.connect('transactions', function() {
        sub.setEncoding('utf8');
        sub.on('data', (data) => {
            const transaction = JSON.parse(data);
            const outs = _.filter(transaction.out, (out) => _.includes(addresses, out.addr));
            const transactionAmount = _.reduce(outs, (acc, out) => {
                return acc + out.value;
            }, 0);

            const tokenAmount = (transactionAmount / 100000000) * 10;

            const response = Object.assign({}, transaction, {tokenAmount});
            console.log(response);
            ws.broadcast(response);
        });
    });
});
