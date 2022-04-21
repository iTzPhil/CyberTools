const inquirer = require('inquirer')
const crypto = require('crypto');
const config = require("../config.json")
const lang = require("../lang/" + config.lang + ".json")

var questions = [
    {
        type: 'input',
        name: 'text',
        message: lang["msg.decode.text"]
    },
    {
        type: 'input',
        name: 'key',
        message: lang["msg.decode.key"]
    },
    {
        type: 'input',
        name: 'iv',
        message: lang["msg.decode.iv"]
    }
]

inquirer.prompt(questions).then(answers => {
    const text = answers['text']
    const key = answers['key']
    const iv = Buffer.from(answers['iv'])

    
    function decrypt(text) {

            var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
            var dec = decipher.update(text, 'hex', 'utf8')
            dec += decipher.final('utf8');
            return dec;
    }
    var decrypted = decrypt(text)
    console.log(lang["msg.decode.res"] + decrypted)
})