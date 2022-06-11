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
            { name: lang["msg.option.language"], value: 'language' },
            { name: lang["msg.option.keysave"], value: 'keysave' }
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


var keysave = [
    {
        type: 'list',
        name: 'keys',
        message: lang["msg.keysave"],
        choices: [
            { name: lang["msg.encode.key1"], value: 'key1' },
            { name: lang["msg.encode.key2"], value: 'key2' },
            { name: lang["msg.encode.key3"], value: 'key3' }
        ]
    }]

var editkey = [
    {
        type: 'input',
        name: 'newkey',
        message: lang["msg.editkey"]
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
            if (answers['option'] == 'keysave') {
                inquirer.prompt(keysave).then(answers => {
                    if (answers['keys'] == 'key1') {
                        inquirer.prompt(editkey).then(answers => {
                            if (answers['newkey'].length != 32) {
                                console.log(lang["msg.key.invalid"])
                            } else {
                                cfg.set("key1", answers['newkey']);
                                cfg.save();
                                console.log(lang["msg.key.change.key"])
                            }
                        })
                    } else if (answers['keys'] == 'key2') {
                        inquirer.prompt(editkey).then(answers => {
                            if (answers['newkey'].length != 32) {
                                console.log(lang["msg.key.invalid"])
                            } else {
                                cfg.set("key2", answers['newkey']);
                                cfg.save();
                                console.log(lang["msg.key.change.key"])
                            }
                        })
                    } else if (answers['keys'] == 'key3') {
                        inquirer.prompt(editkey).then(answers => {
                            if (answers['newkey'].length != 32) {
                                console.log(lang["msg.key.invalid"])
                            } else {
                                cfg.set("key3", answers['newkey']);
                                cfg.save();
                                console.log(lang["msg.key.change.key"])
                            }

                        })

                    }

                    else {
                        console.log(lang["msg.lang.invalid.option"])
                    }
                })
            }
        }
        )
    }
})