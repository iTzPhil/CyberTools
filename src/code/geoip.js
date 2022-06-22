const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const inquirer = require('inquirer')
const config = require("../config.json")
var lang = require("../lang/en.json")

if (config.lang == "en") {
    var lang = require("../lang/en.json")
} else if (config.lang == "de") {
    var lang = require("../lang/de.json")
} else if (config.lang == "es") {
    var lang = require("../lang/es.json")
}


var questions = [
    {
        type: 'input',
        name: 'ip',
        message: lang["msg.geoip.start"]
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

    }
};
    geoip.open('GET', endpoint, true);
    geoip.send();
});