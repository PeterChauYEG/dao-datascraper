"use strict";

// require npm packages
const bl = require('bl');
const fs = require('fs');
const https = require('https');
const json2csv = require('json2csv');

// set up variables
// DAO Ethereum address
const address = '0xbb9bc244d798123fde783fcc1c72d3bb8c189413';
const date = new Date();
// path/to/csv
const output = `output/${date}.csv`;
// csv field headers
const fields = ['blockNumber', 'timeStamp', 'hash', 'nonce', 'blockHash', 'transactionIndex', 'from', 'to', 'value', 'gas', 'gasPrice', 'input', 'contractAddress', 'cumulativeGasUsed', 'gasUsed', 'confirmations'];

process.stdout.write('DAO-datascraper initialized!\n');

// get data from the etherscan.io api https://etherscan.io/apis
// Make https request
https.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc`, (res) => {

    process.stdout.write(`StatusCode: ${res.statusCode}\n`);

    // return a String not an Buffer
    res.setEncoding('utf8');
    // wait for and combine all responses
    res.pipe(bl((err, data) => {

        if (err) {
            process.stdout.write(`Error: ${err}\n`);
        }

        process.stdout.write('Getting DAO transaction logs from etherscan\n');

        // convert to JSON
        const json = JSON.parse(data);

        // convert to csv
        json2csv({
            data: json["result"],
            fields: fields
        }, (err, csv) => {

            if (err) {
                process.stdout.write(`Error: ${err}\n`);
            }

            // export csv to output/
            fs.writeFile(output, csv, (err) => {

                if (err) {
                    process.stdout.write(`Error: ${err}\n`);
                }

                process.stdout.write(`File saved: ${output}\n`);

            });

        });

    }));

}).on('error', (err) => {

    process.stdout.write(`Error: ${err}\n`);

});
