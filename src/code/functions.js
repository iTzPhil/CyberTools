const crypto = require('crypto');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var generator = require('generate-password');
var QRCode = require('qrcode')
var steggy = require('steggy');
const fs = require('fs');


function encrypt(text, key, iv) {
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decode(text, key, iv) {
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

async function geoip(query) {
    return new Promise((resolve, reject) => {
        var endpoint = 'http://ip-api.com/json/' + query + '?fields=18081275';
        var geoip = new XMLHttpRequest();
        geoip.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                resolve(response);
            }
        };
        geoip.open('GET', endpoint, true);
        geoip.send();
    });
}

function passwordGen(int, num, sym, uc, lc) {
    if (int < 1 || int > 1024) {
        throw new Error("Length must be between 1 and 128");
    }

    var password = generator.generate({
        length: int,
        numbers: !!num,
        symbols: !!sym,
        uppercase: !!uc,
        lowercase: !!lc,
        excludeSimilarCharacters: false,
        exclude: '"`,',
        strict: true
    });
    return password
}

function qrCode(text) {
    return new Promise((resolve, reject) => {
        QRCode.toString(text, { type: 'svg' }, function (err, svgString) {
            if (err) {
                reject(err);
            } else {
                resolve(svgString);
            }
        });
    });
}

function conceal(img, text) {
    const concealed = steggy.conceal()(img, text, 'utf8')
    return concealed
}

function reveal(img) {
    const revealed = steggy.reveal()(img, 'utf8')
    return revealed
}

module.exports = {
    encrypt,
    decode,
    geoip,
    passwordGen,
    qrCode,
    conceal,
    reveal
}