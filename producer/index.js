const btSocket = require('blockchain.info/Socket');
const btExplorer = require('blockchain.info/blockexplorer');
const amqp = require('amqplib');

const addresses = ['2MwcVyhWzUrS6AK8mwAZPjBfeQqtdEGgeSg',
    '2NE7cEdVPFPrVviMvnQYGiNfeTMZnokHu23',
    '2MtcSCijSWDruTq316PNV8onKzeq4amMPb3',
    '2N2u2dMHKr4B7CMPQNptxEqrGWu9fVfCA5m',
    '2N2C6oBBvrC8Kan4bREcvPQHLUE9FpgCY6g',
];

const bitcoinSocket = new btSocket({network: 3});
const blockExplorer = btExplorer.usingNetwork(3);

const rabbitHost = process.env.RABBIT_HOST || 'localhost';

const queueName = 'transaction';

function intersection(arr1, arr2) {
    return arr1.filter((i) => arr2.indexOf(i) !== -1);
}

function filterTransactions(transactionLog) {
    const fundingTransactions = transactionLog.txs.filter((tx) => {
        const ins = tx.inputs.map((item) => item.prev_out.addr);
        const outs = tx.out.map((item) => item.addr);
        const isFundingTransaction =
            !intersection(ins, addresses).length && intersection(outs, addresses).length;
        return isFundingTransaction;
    });
    return fundingTransactions;
}

async function sendOldTransactions(callback) {
    const limit = 100;
    let offset = 0;
    let reachedEnd = false;
    do {
        const transactionLog = await blockExplorer.getMultiAddress(addresses, {limit, offset});
        const transactions = filterTransactions(transactionLog);
        transactions.forEach(callback);
        if (transactionLog.txs.length < limit) {
            reachedEnd = true;
        } else {
            offset += limit;
        }
    } while (!reachedEnd);
}

amqp.connect(`amqp://user:pass@${rabbitHost}/vhost`)
.then((connection) => connection.createChannel(connection))
.then((channel) => {
    return channel.assertQueue(queueName).then(async () => {
        await sendOldTransactions((tx) => {
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(tx)));
        });

        bitcoinSocket.onTransaction((tx) => {
            console.log(tx);
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(tx)));
        }, {
            addresses
        });
    });
}).catch(console.warn);