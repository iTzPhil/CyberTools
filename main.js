const inquirer = require('inquirer')
const config = require("./config.json")
const editJsonFile = require("edit-json-file");
let cfg = editJsonFile(`./config.json`);


var start = [
    {
        type: 'input',
        name: 'start',
        message: "What do you want to do? (encode/decode/settings)"
    }]

var settings = [
    {
        type: 'input',
        name: 'option',
        message: "What do you want to change? (language)"
    }]
var lang = [
    {
        type: 'input',
        name: 'lang',
        message: "What language do you want to use? (en/de)"
    }]



inquirer.prompt(start).then(answers => {
    const action = answers['start']
    if (action == 'encode') {
        console.log('\n \n \n \n \n \n \n \n')
        const encodefile = require("./encode.js")
    } else if (action == 'decode') {
        console.log('\n \n \n \n \n \n \n \n')
        const decodefile = require("./decode.js")
    } else if (action == 'settings') {
        inquirer.prompt(settings).then(answers => {
            if (answers['option'] == 'language') {
                inquirer.prompt(lang).then(answers => {
                    if (answers['lang'] == 'en') {
                        cfg.set("lang", "en");
                        cfg.save();
                        console.log('Language changed to english')
                    } else if (answers['lang'] == 'de') {
                        cfg.set("lang", "de");
                        cfg.save();
                        console.log('Language changed to german')
                    } else {
                        console.log('Language not found')
                    }
                })
            } 
        })
    }

 else {
    console.log('Invalid option')
}
})
