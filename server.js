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
            "appkey": "f25a420d-4038-4266-9d67-dbb35f59cbbe",
        },
        json: {
            thingName: thing,
            propertyName: ''
        }
    }, function (err, res, body) {
        // Validate response
        if (err) return callback(err);
        if (typeof body.properties === 'undefined') return callback('404');
        if (typeof body.properties.music === 'undefined') return callback('404');
        if (typeof body.properties.music.value === 'undefined') return callback('404');

        // Return the value
        return callback(null, body.properties.music.value);
    });
}

setInterval(function () {
    console.log(storage);
    getProperty('Jill_crogers', function (err, body) {
        if (err) return;
        storage = body;
    });
}, 1000);

const server = http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(storage);
});
server.listen(8000);
