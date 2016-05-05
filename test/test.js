// require npm packages
const assert = require('chai').assert;
const expect = require('chai').expect;
const request = require('request');

// require code to test
const main = require('../main.js');
const address = require('../settings.js').address;

describe('Datascraper', function() {
    it('should return a https response with the status code: 200', function(done) {
        request.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc`, function (err, res, body) {
            expect(res.statusCode).to.equal(200);
            done();
        });

    });
    
    // pending test below
    it('should return a String');
    it('should return a JSON object');
    it('should return a csv object');
    it('should export a csv file to output/');
});