var generator = require('generate-password');
const clipboardy = require('clipboardy');
const config = require(process.cwd() + "/src/config.json")
const inquirer = require('inquirer');
if (config.lang == "en") {
    var lang = require(process.cwd() + "/src/lang/en.json")
} else if (config.lang == "de") {
    var lang = require(process.cwd() + "/src/lang/de.json")
} else if (config.lang == "es") {
    var lang = require(process.cwd() + "/src/lang/es.json")
}

inquirer
    .prompt([
        {
            type: 'input',
            name: 'int',
            prefix: '',
            message: lang["msg.pwgen.length"]
        },
        {
            type: 'list',
            name: 'num',
            message: lang["msg.pwgen.numbers"],
            prefix: '',
            choices: [
                { name: lang["msg.pwgen.yes"], value: 'true' },
                { name: lang["msg.pwgen.no"], value: 'false' }
            ]
        },
        {
            type: 'list',
            name: 'sym',
            prefix: '',
            message: lang["msg.pwgen.symbols"],
            choices: [
                { name: lang["msg.pwgen.yes"], value: true },
                { name: lang["msg.pwgen.no"], value: false }
            ]
        },
        {
            type: 'list',
            name: 'uc',
            prefix: '',
            message: lang["msg.pwgen.uppercase"],
            choices: [
                { name: lang["msg.pwgen.yes"], value: true },
                { name: lang["msg.pwgen.no"], value: false }
            ]
        },
        {
            type: 'list',
            name: 'lc',
            prefix: '',
            message: lang["msg.pwgen.lowercase"],
            choices: [
                { name: lang["msg.pwgen.yes"], value: true },
                { name: lang["msg.pwgen.no"], value: false }
            ]
        }

    ])
   .then((answers) => {
    if (isNaN(answers.int) || answers.int <= 3) {
        console.log(lang["msg.pwgen.length.invalid"])
    } else {

        var password = generator.generate({
            length: answers.int,
            numbers: answers.num,
            symbols: answers.sym,
            uppercase: answers.uc,
            lowercase: answers.lc,
            excludeSimilarCharacters: false,
            exclude: '"`,',
            strict: true
        });
        clipboardy.writeSync(password)
        console.log(lang["msg.pwgen.generated"] + "\n" + password)

    }
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log(error)
        } else {
            console.log(error)
        }
    });



