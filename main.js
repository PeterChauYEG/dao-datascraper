"use strict";

// require npm packages
const bl = require('bl');
const https = require('https');

// require modules
const address = require('./settings.js').address;
const exportAsCsv = require('./exportAsCsv.js');
const exportAsJson = require('./exportAsJson.js');

// set up variables
const clArg = 2;
// Export as JSON or CSV?
const exportAs = process.argv[clArg];
// DAO Ethereum address
const date = new Date();
// path/to/csv
const outputPath = `output/${date}`;
// csv field headers
const fields = ['blockNumber', 'timeStamp', 'hash', 'nonce', 'blockHash', 'transactionIndex', 'from', 'to', 'value', 'gas', 'gasPrice', 'input', 'contractAddress', 'cumulativeGasUsed', 'gasUsed', 'confirmations'];

process.stdout.write('DAO-datascraper initialized!\n');

// get data from the etherscan.io api https://etherscan.io/apis
// Make https request
const server = () => {
    https.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc`, (res) => {

        process.stdout.write(`StatusCode: ${res.statusCode}\n`);

        // set res to String not an Buffer
        res.setEncoding('utf8');
        // wait for and combine all responses
        res.pipe(bl((err, data) => {

            if (err) {
                process.stdout.write(`Error: ${err}\n`);
            }

            process.stdout.write('Getting DAO transaction logs from etherscan\n');

            // convert to JSON
            const json = JSON.parse(data);

            // What format do we want to export our data as?
            if (exportAs === 'json') {
                // export as json
                exportAsJson(json, outputPath);
            } else {
                // export as csv
                exportAsCsv(json, fields, outputPath);
            }

        }));

    }).on('error', (err) => {

        process.stdout.write(`Error: ${err}\n`);

    });
};

server();

module.exports = server;
