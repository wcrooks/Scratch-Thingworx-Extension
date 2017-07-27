/**
 * ThingWorx IoT API.
 * @param  {object} ext Extension interface.
 * @return {void}
 */
(function(ext) {
    ext.getData = function (callback) {
        $.ajax({
            url: 'http://localhost:8000',
            success: function (response) {
                console.dir(response);
                callback(response);
            },
            error: function (error) {
                console.dir(error);
                callback();
            }
        });
    };

    ext.sendData = function (val, callback) {
        $.ajax({
            url: 'http://localhost:8080/sendNum',
            type: 'POST',
            data: {num: val},
            dataType: 'json',
            success: function(result) {
                window.console.log('Successful');
                callback(result);
            }
        });
    };

    ext._shutdown = function () {};

    ext._getStatus = function () {
        return {
            status: 2,
            msg: 'Ready'
        };
    };

    var descriptor = {
        blocks: [
            ['R', 'data in', 'getData'],
            ['', 'data out %n', 'sendData', 0]
        ]
    };

    // Register the extension
    ScratchExtensions.register('Learninator', descriptor, ext);
})({});