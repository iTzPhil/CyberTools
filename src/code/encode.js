const inquirer = require('inquirer')
const crypto = require('crypto');
const config = require("../config.json")
const lang = require("../lang/" + config.lang + ".json")

var questions = [
    {
        type: 'input',
        name: 'text',
        message: lang["msg.encode.text"]
    },
    {
        type: 'list',
        name: 'keyc',
        message: lang["msg.encode.keyc"],
        choices: [
            { name: lang["msg.encode.key1"], value: config.key1 },
            { name: lang["msg.encode.key2"], value: config.key2 },
            { name: lang["msg.encode.key3"], value: config.key3 },
            { name: lang["msg.encode.key.custom"], value: 'custom' }
        ]
    }
]

var customkey = [
    {
        type: 'input',
        name: 'key2',
        message: lang["msg.encode.key"]
    }
]

inquirer.prompt(questions).then(answers => {
    const text = answers['text']
    const key = answers['keyc']
    if (key == 'custom') {
        inquirer.prompt(customkey).then(answers => {
            const key = answers['key2']
            const iv = crypto.randomBytes(16);
            function encrypt(text) {

                var cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
                var crypted = cipher.update(text, 'utf8', 'hex')
                crypted += cipher.final('hex');
                return crypted;
            }

            var encrypted = encrypt(text)
            console.log(lang["msg.encode.res"] + encrypted)
            console.log(lang["msg.encode.res.iv"] + iv.toString('hex'))
            console.log(lang["msg.encode.res.key"] + key)
        })
    } else {
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
    }



})