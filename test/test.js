'use strict';

// require npm packages
const assert = require('chai').assert;
const expect = require('chai').expect;
const request = require('request');

// require code to test
const address = require('../settings.js').address;
const exportAsCsv = require('../exportAsCsv.js');
const exportAsJson = require('../exportAsJson.js');

describe('Datascraper', function() {
    it('should return a https response with the status code: 200', function(done) {
        request.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc`, function (err, res, body) {
            expect(res.statusCode).to.equal(200);
        });
        done();
    });

    it('should export as CSV', function() {
        const json = {
            result: {
                test: 'some test value'
            }
        };
        const field = ['test'];
        const outputPath = 'output/test';
        const csv = exportAsCsv(json, field, outputPath);
        
        assert.isString(csv, 'sometest');
    });

    it('should export as JSON', function() {
        const json = {
            result: {
                test: 'some test value'
            }
        };
        const outputPath = 'output/test';
        const asJson = exportAsJson(json, outputPath);
        
        assert.isObject(asJson, 'sometest');
    });    
});