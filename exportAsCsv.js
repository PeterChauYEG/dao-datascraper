// require npm packages
const json2csv = require('json2csv');

// require modules
const saveData = require('./saveData.js');

module.exports = (json, fields, outputPath) => {

    // convert to csv
    json2csv({
        data: json["result"],
        fields
    }, (err, csv) => {

        if (err) {
            process.stdout.write(`Error: ${err}\n`);
        }

        // save csv to output/
        saveData(outputPath, csv);

    });

};
