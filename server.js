/**
 *
 */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
var upload = multer();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('Service work...');
});

app.post('/', upload.array(), function (req, res) {
    res.send('Service work...');
});

app.post('/exec', upload.array(), function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    let data = "{}";
    let result = JSON.parse(data);
    console.log('----------------json parse----------------');
    console.log(result);
    console.log('----------------response to front end----------------');
    console.log(JSON.stringify(result).replace('eee',''));
    res.end(JSON.stringify(result));
});

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
    console.log("/list_user GET 请求");
    res.send('用户列表页面');
});

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
});

module.exports.start = ()=> {
    var server = app.listen(18240, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("service start on http://%s:%s", host, port);
    });
};
