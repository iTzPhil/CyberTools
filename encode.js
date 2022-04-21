const inquirer = require('inquirer')
const crypto = require('crypto');
const config = require("./config.json")
const lang = require("./lang/" + config.lang + ".json")

var questions = [
    {
        type: 'input',
        name: 'text',
        message: lang["msg.encode.text"]
    },
    {
        type: 'input',
        name: 'key',
        message: lang["msg.encode.key"]
    }
]



inquirer.prompt(questions).then(answers => {
    const text = answers['text']
    const key = answers['key']

    const iv = crypto.randomBytes(16);
    function encrypt(text) {

        var cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    }

    var encrypted = encrypt(text)
    console.log(lang["msg.encode.res.text"] + encrypted)
    console.log(lang["msg.encode.res.iv"] + iv.toString('hex'))
    console.log(lang["msg.encode.res.key"] + key)
})