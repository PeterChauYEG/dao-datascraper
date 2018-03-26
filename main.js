"use strict";

// require npm packages
const bl = require('bl');
const https = require('https');

// require modules
const address = require('./settings.js').address;
const action = require('./settings.js').action;
const startblock = require('./settings.js').startblock;
const endblock = require('./settings.js').endblock;
const page = require('./settings.js').page;
const offset = require('./settings.js').offset;
const sortOrder = require('./settings.js').sortOrder;
const apikey = require('./settings.js').apikey;
const outputFileNamePrepend = require('./settings.js').outputFileNamePrepend;
const exportAsCsv = require('./exportAsCsv.js');
const exportAsJson = require('./exportAsJson.js');

// set up variables
const clArg = 2;
// Export as JSON or CSV?
const exportAs = process.argv[clArg];
// DAO Ethereum address
const date = new Date();
const formattedDate = {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
};

// path/to/csv
const outputPath = `output/${outputFileNamePrepend}${formattedDate.year}_${formattedDate.month}_${formattedDate.day}`;
// csv field headers
var fields = ['blockNumber', 'timeStamp', 'hash', 'nonce', 'blockHash', 'transactionIndex', 'from', 'to', 'value', 'gas', 'gasPrice', 'isError', 'txreceipt_status', 'input', 'contractAddress', 'cumulativeGasUsed', 'gasUsed', 'confirmations'];

process.stdout.write('DAO-datascraper initialized!\n');

var apiURL = `https://api.etherscan.io/api?module=account&address=${address}`;

if (action == 'txlistinternal') {
	apiURL=`${apiURL}&action=${action}`;
	process.stdout.write(`action found in settings.js updating API URL: &action=${action}\n`);

  fields = ['blockNumber', 'timeStamp', 'hash', 'from', 'to', 'value', 'contractAddress', 'input', 'type', 'gas', 'gasUsed', 'traceId', 'isError', 'errCode'];
  process.stdout.write('action is txlistinternal. Setting CSV TxHash field as parentTxHash\n');
} else {
  apiURL=`${apiURL}&action=txlist`;
	process.stdout.write('Using default action. Updating API URL: &action=txlist\n');
} //end if (action !== '')
if (startblock !== '') {
	apiURL=`${apiURL}&startblock=${startblock}`;
	process.stdout.write(`startblock found in settings.js updating API URL: &startblock=${startblock}\n`);
} //end if (startblock !== '')
if (endblock !== '') {
	apiURL=`${apiURL}&endblock=${endblock}`;
	process.stdout.write(`endblock found in settings.js updating API URL: &endblock=${endblock}\n`);
} //end if (endblock !== '')
if (page !== '') {
	apiURL=`${apiURL}&page=${page}`;
	process.stdout.write(`page found in settings.js updating API URL: &page=${page}\n`);
} //end if (page !== '')
if (offset !== '') {
	apiURL=`${apiURL}&offset=${offset}`;
	process.stdout.write(`offset found in settings.js updating API URL: &offset=${offset}\n`);
} //end if (offset !== '')
if (sortOrder !== '') {
	apiURL=`${apiURL}&sort=${sortOrder}`;
	process.stdout.write(`sortOrder found in settings.js updating API URL: &sortOrder=${sortOrder}\n`);
} else {
  apiURL=`${apiURL}&sort=asc`;
	process.stdout.write('Using default sortOrder. Updating API URL: &sort=asc\n');
} //end if (sortOrder !== '')
if (apikey !== '') {
	apiURL=`${apiURL}&apikey=${apikey}`;
	process.stdout.write(`apikey found in settings.js updating API URL: &apikey=${apikey}\n`);
} //end if (apikey !== '')

process.stdout.write(`Compiled API URL: ${apiURL}\n`);

// get data from the etherscan.io api https://etherscan.io/apis
// Make https request
const server = () => {
    https.get(`${apiURL}`, (res) => {

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
