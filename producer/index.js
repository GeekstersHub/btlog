const btSocket = require('blockchain.info/Socket');
const rabbitJs = require('rabbit.js');

const addresses = ['2MwcVyhWzUrS6AK8mwAZPjBfeQqtdEGgeSg',
    '2NE7cEdVPFPrVviMvnQYGiNfeTMZnokHu23',
    '2MtcSCijSWDruTq316PNV8onKzeq4amMPb3',
    '2N2u2dMHKr4B7CMPQNptxEqrGWu9fVfCA5m',
    '2N2C6oBBvrC8Kan4bREcvPQHLUE9FpgCY6g',
];

const bitcoinSocket = new btSocket({network: 3});

const context = rabbitJs.createContext('amqp://user:pass@rabbit/vhost');

context.on('ready', function() {
    const pub = context.socket('PUB');
    pub.connect('transactions', function() {
        bitcoinSocket.onTransaction((tx) => {
            pub.write(JSON.stringify(tx));
        }, {
            addresses
        });
    });
});
