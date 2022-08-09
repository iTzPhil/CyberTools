const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const inquirer = require('inquirer')
const config = require(process.cwd() + "/src/config.json")
fs = require('fs');
const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/Desktop`;
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');
const notifier = require('node-notifier');


if (config.lang == "en") {
    var lang = require(process.cwd() + "/src/lang/en.json")
} else if (config.lang == "de") {
    var lang = require(process.cwd() + "/src/lang/de.json")
} else if (config.lang == "es") {
    var lang = require(process.cwd() + "/src/lang/es.json")
}


var questions = [
    {
        type: 'input',
        name: 'ip',
        prefix: '',
        message: lang["msg.geoip.start"]
    }
]

var endproccess = [
    {
        type: 'input',
        name: 'end',
        prefix: '',
        message: lang["msg.end"]
    }
]


inquirer.prompt(questions).then(answers => {
    var query = answers['ip']
    var endpoint = 'http://ip-api.com/json/' + query + '?fields=18081275';
    var geoip = new XMLHttpRequest();
geoip.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        if (response.status !== 'success') {
            console.log('Error: ' + response.message);
            return
        }
        // Change outut if mobile is false from false to no
        if (response.mobile === false) {
            response.mobile = lang["msg.geoip.false"]
        }
        if (response.proxy === false) {
            response.proxy = lang["msg.geoip.false"]
        }
        if (response.hosting === false) {
            response.hosting = lang["msg.geoip.false"]
        }
        
        if (response.mobile === true) {
            response.mobile = lang["msg.geoip.true"]
        }
        if (response.proxy === true) {
            response.proxy = lang["msg.geoip.true"]
        }
        if (response.hosting === true) {
            response.hosting = lang["msg.geoip.true"]
        }
        

        console.log(lang["msg.geoip.continent"] + response.continent);
        console.log(lang["msg.geoip.country"] + response.country);
        console.log(lang["msg.geoip.city"] + response.city);
        console.log(lang["msg.geoip.region"] + response.regionName);
        console.log(lang["msg.geoip.zip"] + response.zip);
        console.log(lang["msg.geoip.timezone"] + response.timezone);
        console.log(lang["msg.geoip.coordinates"] + response.lat + ", " + response.lon);
        console.log(lang["msg.geoip.org"] + response.org);
        console.log(lang["msg.geoip.mobile"] + response.mobile);
        console.log(lang["msg.geoip.proxy"] + response.proxy);
        console.log(lang["msg.geoip.hosting"] + response.hosting);


        fs.writeFile(desktopDir + '/geoip-' + uuidv4() + '.txt',lang["msg.geoip.continent"] + response.continent + "\n" + lang["msg.geoip.country"] + response.country + "\n" + lang["msg.geoip.city"] + response.city + "\n" + lang["msg.geoip.region"] + response.regionName + "\n" + lang["msg.geoip.zip"] + response.zip + "\n" + lang["msg.geoip.timezone"] + response.timezone + "\n" + lang["msg.geoip.coordinates"] + response.lat + ", " + response.lon + "\n" + lang["msg.geoip.org"] + response.org + "\n" + lang["msg.geoip.mobile"] + response.mobile + "\n" + lang["msg.geoip.proxy"] + response.proxy + "\n" + lang["msg.geoip.hosting"] + response.hosting, function (err) {
            if (err) return console.log(err);
        });
        notifier.notify({
            title: config.name,

            message: lang["msg.file.created"],
            icon: process.cwd() + '/src/assets/icon.png',

          });
          inquirer.prompt(endproccess).then(answers => {
            process.exit()
          })


    }
};
    geoip.open('GET', endpoint, true);
    geoip.send();
});