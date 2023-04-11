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
var QRCode = require('qrcode')

if (config.lang == "en") {
    var lang = require(process.cwd() + "/src/lang/en.json")
} else if (config.lang == "de") {
    var lang = require(process.cwd() + "/src/lang/de.json")
} else if (config.lang == "es") {
    var lang = require(process.cwd() + "/src/lang/es.json")
}

inquirer.prompt([{
    type: 'input',
    name: 'text',
    message: lang["msg.qr.text"],
    prefix: ''
}]).then(answers => {
    var text = answers.text
    // validate input leght is unser 2953
    if (text.length < 2953) {

        QRCode.toString(text, { type: 'terminal' }, function (err, url) {
            console.log(url)
        })

        QRCode.toFile(`${desktopDir}/qrcode-${uuidv4()}.png`, text, function (err) {
            if (err) throw err
            console.log(lang["msg.qr.done"])
            notifier.notify({
                title: config.name,
                icon: process.cwd() + '/src/assets/logo.png',
                message: lang["msg.qr.done"]
            })
            inquirer.prompt([{
                type: 'input',
                name: 'end',
                prefix: '',
                message: lang["msg.end"]
            }]).then(answers => {
                process.exit()
            })
        })
    } else {
        console.log(lang["msg.qr.error"])
        inquirer.prompt([{
            type: 'input',
            name: 'end',
            prefix: '',
            message: lang["msg.end"]
        }]).then(answers => {
            process.exit()
        })
    }
})