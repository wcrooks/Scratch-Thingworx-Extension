const http = require('http');
const request = require('request');

// Storage object
let storage = null;

/**
 * Get the property of a thing from the ThingWorx API.
 * @param  {string}   thing    Name of the "thing" in the ThingWorx API.
 * @param  {Function} callback
 */
function getProperty (thing, callback) {
    request({
        method: 'POST',
        url: 'https://academic-ni.cloud.thingworx.com/Thingworx/Things/NIUtility/Services/GetPropertyInfo',
        headers: {
            "appkey": "9f1feea6-0659-4062-bef9-977ff92a75d6",
        },
        json: {
            thingName: thing,
            propertyName: ''
        }
    }, function (err, res, body) {
        // Validate response
        if (err) return callback(err);
        if (typeof body.properties === 'undefined') return callback('404');
        if (typeof body.properties.RandomNumber2 === 'undefined') return callback('404');
        if (typeof body.properties.RandomNumber2.value === 'undefined') return callback('404');

        // Return the value
        return callback(null, body.properties.RandomNumber2.value);
    });
}

setInterval(function () {
    getProperty('ScratchPad_wcrooks', function (err, body) {
        if (err) return;
        storage = body;
    });
    console.log(storage);
}, 1000);

const server = http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(storage);
});
server.listen(8001);
