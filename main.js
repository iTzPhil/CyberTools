const inquirer = require('inquirer')
const config = require("./src/config.json")
const lang = require("./src/lang/" + config.lang + ".json")
const editJsonFile = require("edit-json-file");
let cfg = editJsonFile(`./src/config.json`);

 console.log(lang)


var start = [
    {
        type: 'input',
        name: 'start',
        message: lang["msg.start"]
    }]

var settings = [
    {
        type: 'input',
        name: 'option',
        message: lang["msg.option"]
    }]
var language = [
    {
        type: 'input',
        name: 'lang',
        message: lang["msg.lang"]
    }]



inquirer.prompt(start).then(answers => {
    const action = answers['start']
    if (action == 'encode') {
        console.log('\n \n \n \n \n \n \n \n')
        const encodefile = require("./src/code/encode.js")
    } else if (action == 'decode') {
        console.log('\n \n \n \n \n \n \n \n')
        const decodefile = require("./src/code/decode.js")
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
