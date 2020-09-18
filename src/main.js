"use strict";
exports.__esModule = true;
exports.translate = void 0;
var https = require("https");
var querystring = require("querystring");
var private_1 = require("../private");
var md5 = require("md5");
var errorMap = {
    52003: '用户认证失败',
    54001: '签名错误',
    54004: '账户余额不足'
};
exports.translate = function (word) {
    var salt = Math.random();
    var sign = md5(private_1.appId + word + salt + private_1.key);
    var from, to;
    if (/[a-zA-Z]/.test(word[0])) {
        // 英译为中
        from = 'en';
        to = 'zh';
    }
    else {
        // 中译为英
        from = 'zh';
        to = 'en';
    }
    var query = querystring.stringify({
        q: word,
        appid: private_1.appId,
        salt: salt, sign: sign, from: from, to: to
    });
    var options = {
        hostname: 'api.fanyi.baidu.com',
        port: 443,
        path: '/api/trans/vip/translate?' + query,
        method: 'GET'
    };
    var request = https.request(options, function (response) {
        var chunks = [];
        response.on('data', function (chunk) {
            chunks.push(chunk);
        });
        response.on('end', function () {
            var string = Buffer.concat(chunks).toString();
            var object = JSON.parse(string);
            if (object.error_code) {
                console.error(errorMap[object.error_code] || object.error_msg);
                process.exit(2);
            }
            else {
                object.trans_result.map(function (obj) {
                    console.log(obj.dst);
                });
                process.exit(0);
            }
        });
    });
    request.on('error', function (e) {
        console.error(e);
    });
    request.end();
};
