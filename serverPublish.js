var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

var path = __dirname +'/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/*  
    to send data to this server, needs to send to url localhost:8080/sendNum or <computer's ip>:8080/sendNum
    data being sent also needs to have num property. ex: {num: "20"}
*/
app.post("/sendNum", function(req, res){
    res.send('200');
    var num = parseFloat(req.body.num);
    console.log(num);
    /* put request to send to thingworx */
    request({
        method: "PUT",
        url: "https://academic-ni.cloud.thingworx.com/Thingworx/Things/ScratchPad_wcrooks/Properties/*",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic d2Nyb29rczpjZWUwcHJlayE="
        },
        json: {
            "RandomNumber3": num //change this to desired property, can also have multiple properties
        }
        }, function(err, res, body){
            if (err) {
                console.log("fail");
            } else {
                console.log("success")
            }
    });

});
app.listen(process.env.PORT || 8001);