'use strict';

// require npm packages
const json2csv = require('json2csv');

// require modules
const saveData = require('./saveData.js');

let csvExport = 0;

module.exports = (json, fields, outputPath) => {

    // convert to csv
    json2csv({
        data: json["result"],
        fields
    }, (err, csv) => {

        if (err) {
            process.stdout.write(`Error: ${err}\n`);
        }

        const path = `${outputPath}.csv`;

        // save csv to output/
        saveData(path, csv);

        csvExport = csv;

    });

    return csvExport;
};
