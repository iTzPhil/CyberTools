const inquirer = require('inquirer')
const config = require("./src/config.json")
//const lang = require("./src/lang/" + config.lang + ".json")
const editJsonFile = require("edit-json-file");
let cfg = editJsonFile(`./src/config.json`);

var lang = require("./src/lang/en.json")

if (config.lang == "en") {
    var lang = require("./src/lang/en.json")
} else if (config.lang == "de") {
    var lang = require("./src/lang/de.json")
} else if (config.lang == "es") {
    var lang = require("./src/lang/es.json")
}


var start = [
    {
        type: 'list',
        name: 'start',
        message: lang["msg.start"],
        choices: [
            { name: lang["msg.start.options.encode"], value: 'encode' },
            { name: lang["msg.start.options.decode"], value: 'decode' },
            { name: lang["msg.start.options.geoip"], value: 'geoip' },
            { name: lang["msg.start.options.settings"], value: 'settings' }
        ]
    }]

var settings = [
    {
        type: 'list',
        name: 'option',
        message: lang["msg.option"],
        choices: [
            { name: lang["msg.option.language"], value: 'language' }
        ]
    }]
var language = [
    {
        type: 'list',
        name: 'lang',
        message: lang["msg.lang"],
        choices: [
            { name: lang["msg.lang.en"], value: 'en' },
            { name: lang["msg.lang.de"], value: 'de' },
            { name: lang["msg.lang.es"], value: 'es' }
        ]
    }]



inquirer.prompt(start).then(answers => {
    const action = answers['start']
    if (action == 'encode') {
        console.log('\n \n \n')
        const encodefile = require("./src/code/encode.js")
    } else if (action == 'decode') {
        console.log('\n \n \n')
        const decodefile = require("./src/code/decode.js")
    } else if (action == 'geoip') {
        console.log('\n \n \n')
        const geoipfile = require("./src/code/geoip.js")
    } else if (action == 'settings') {
        inquirer.prompt(settings).then(answers => {
            if (answers['option'] == 'language') {
                inquirer.prompt(language).then(answers => {
                    if (answers['lang'] == 'en') {
                        cfg.set("lang", "en");
                        cfg.save();
                        console.log(lang["msg.lang.change.en"])
                    } else if (answers['lang'] == 'de') {
                        cfg.set("lang", "de");
                        cfg.save();
                        console.log(lang["msg.lang.change.en"])
                    } else if (answers['lang'] == 'es') {
                        cfg.set("lang", "es");
                        cfg.save();
                        console.log(lang["msg.lang.change.es"])
                    } else {
                        console.log(lang["msg.lang.invalid"])
                    }
                })
            }
        })
    }

    else {
        console.log(lang["msg.lang.invalid.option"])
    }
})
