const inquirer = require('inquirer');
const config = require(process.cwd() + "/src/config.json")
const editJsonFile = require("edit-json-file");
let cfg = editJsonFile(process.cwd() + `/src/config.json`);
const crypto = require('crypto');
const fs = require('fs');
const path = require("path")

var lang = require(process.cwd() + "/src/lang/en.json")

if (config.lang == "en") {
    var lang = require(process.cwd() + "/src/lang/en.json")
} else if (config.lang == "de") {
    var lang = require(process.cwd() + "/src/lang/de.json")
} else if (config.lang == "es") {
    var lang = require(process.cwd() + "/src/lang/es.json")
}


var start = [
    {
        type: 'list',
        name: 'start',
        message: lang["msg.start"],
        prefix: '',
        choices: [
            { name: lang["msg.start.options.encode"], value: 'encode' },
            { name: lang["msg.start.options.decode"], value: 'decode' },
            { name: lang["msg.start.options.geoip"], value: 'geoip' },
            { name: lang["msg.start.options.password"], value: 'password' },
            { name: lang["msg.start.options.speedtest"], value: 'speedtest' },
            { name: lang["msg.start.options.qr"], value: 'qrcode' },
            { name: lang["msg.start.options.stegano"], value: 'stegano' },
            { name: lang["msg.start.options.settings"], value: 'settings' }
        ]
    }]

var settings = [
    {
        type: 'list',
        name: 'option',
        message: lang["msg.option"],
        prefix: '',
        choices: [
            { name: lang["msg.option.language"], value: 'language' },
            { name: lang["msg.option.keysave"], value: 'keysave' },
            { name: lang["msg.option.ivsave"], value: 'ivsave' }
        ]
    }]
var language = [
    {
        type: 'list',
        name: 'lang',
        prefix: '',
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
        prefix: '',
        choices: [
            { name: lang["msg.encode.key1"], value: 'key1' },
            { name: lang["msg.encode.key2"], value: 'key2' },
            { name: lang["msg.encode.key3"], value: 'key3' }
        ]
    }]

var ivsave = [
    {
        type: 'list',
        name: 'ivs',
        message: lang["msg.ivsave"],
        prefix: '',
        choices: [
            { name: "IV 1", value: 'iv1' },
            { name: "IV 2", value: 'iv2' },
            { name: "IV 3", value: 'iv3' }
        ]
    }]

var editkey = [
    {
        type: 'input',
        name: 'newkey',
        prefix: '',
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
    } else if (action == 'password') {
        console.log('\n \n \n')
        const passwordfile = require("./src/code/passwordgen.js")
    } else if (action == 'speedtest') {
        console.log('\n \n \n')
        const speedtestfile = require("./src/code/speedtest.js")
    } else if (action == 'qrcode') {
        console.log('\n \n \n')
        const qrcodefile = require("./src/code/qrcode.js")
    } else if (action == 'stegano') {
        console.log('\n \n \n')
        const steganofile = require("./src/code/stegano.js")
    } else if (action == 'settings') {
        inquirer.prompt(settings).then(answers => {
            if (answers['option'] == 'language') {
                inquirer.prompt(language).then(answers => {
                    if (answers['lang'] == 'en') {
                        cfg.set("lang", "en");
                        cfg.save();
                        console.log(lang["msg.lang.change.en"])
                        inquirer.prompt(endproccess).then(answers => {
                            process.exit()
                        })

                    } else if (answers['lang'] == 'de') {
                        cfg.set("lang", "de");
                        cfg.save();
                        console.log(lang["msg.lang.change.en"])
                        inquirer.prompt(endproccess).then(answers => {
                            process.exit()
                        })

                    } else if (answers['lang'] == 'es') {
                        cfg.set("lang", "es");
                        cfg.save();
                        console.log(lang["msg.lang.change.es"])
                        inquirer.prompt(endproccess).then(answers => {
                            process.exit()
                        })

                    } else {
                        console.log(lang["msg.lang.invalid"])
                        inquirer.prompt(endproccess).then(answers => {
                            process.exit()
                        })

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
            if (answers['option'] == "ivsave") {
                inquirer.prompt(ivsave).then(answers => {
                    if (answers['ivs'] == 'iv1') {
                        const iv = crypto.randomBytes(16);
                        const iv2 = iv.toString('hex')
                        cfg.set("iv1", iv2);
                        cfg.save();
                        console.log(lang["msg.ivsave.update"])
                    } else if (answers['option'] == "ivsave") {
                        inquirer.prompt(ivsave).then(answers => {
                            if (answers['ivs'] == 'iv2') {
                                const iv = crypto.randomBytes(16);
                                const iv2 = iv.toString('hex')
                                cfg.set("iv2", iv2);
                                cfg.save();
                                console.log(lang["msg.ivsave.update"])
                            } else if (answers['option'] == "ivsave") {
                                inquirer.prompt(ivsave).then(answers => {
                                    if (answers['ivs'] == 'iv2') {
                                        const iv = crypto.randomBytes(16);
                                        const iv2 = iv.toString('hex')
                                        cfg.set("iv2", iv2);
                                        cfg.save();
                                        console.log(lang["msg.ivsave.update"])
                                    }


                                })
                            }
                        }
                        )
                    }

                })
            }
        })
    }
})