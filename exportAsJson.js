'use strict';

// require modules
const saveData = require('./saveData.js');

module.exports = (json, outputPath) => {
    const path = `${outputPath}.json`;

    // save json to output/
    saveData(path, JSON.stringify(json));

    return json;
};
