const tx = {
    "lock_time": 1439952,
    "ver": 2,
    "size": 249,
    "inputs": [
    {
        "sequence": 4294967294,
        "prev_out": {
            "spent": true,
            "tx_index": 286165182,
            "type": 0,
            "addr": "2N7SQ1C2dsEKEvCwunpEZj3Ui3MRLMqKs42",
            "value": 426467750296,
            "n": 1,
            "script": "a9149baeb27acac1fd8f1b046c1f69cc025a478da00987"
        },
        "script": "160014d8af305a368220df23e35e189e03abc111a0fe51"
    }
],
    "time": new Date().getTime(),
    "tx_index": 286165362,
    "vin_sz": 1,
    "hash": "fab9c79d31013dd4880bfdb7e4def40f5a81f7d38ca9c50e6a3e015e0b123b8b",
    "vout_sz": 2,
    "relayed_by": "0.0.0.0",
    "out": [
    {
        "spent": false,
        "tx_index": 286165362,
        "type": 0,
        "addr": "2N13ToZoKorA3JB3rZYRPpwdmZFVgansLPE",
        "value": 426440458265,
        "n": 0,
        "script": "a91455878c0df35ce98af72eb2a11796ae2061e4ea9287"
    },
    {
        "spent": false,
        "tx_index": 286165362,
        "type": 0,
        "addr": "2N2C6oBBvrC8Kan4bREcvPQHLUE9FpgCY6g",
        "value": 27275117,
        "n": 1,
        "script": "76a9148eb446f809f526fb37059a32cf8255c4cb43d2da88ac"
    }
]
};

const rabbitJs = require('rabbit.js');

const context = rabbitJs.createContext('amqp://user:pass@localhost/vhost');

context.on('ready', function() {
    const pub = context.socket('PUB');
    pub.connect('transactions', function() {
        pub.write(JSON.stringify(tx));
        setTimeout(() => {context.close()}, 0);
    });
});
