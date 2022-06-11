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
        message: lang["msg.decode.key"]
    }
]

var invec = [
    {
        type: 'input',
        name: 'iv',
        message: lang["msg.decode.iv"]
    }
]




inquirer.prompt(questions).then(answers => {
    const text = answers['text']
    const key = answers['keyc']
    

    if (key == 'custom') {
// aks for a key and than for an iv
        inquirer.prompt(customkey).then(answers => {
            const key = answers['key2']
        //    var key2 = JSON.stringify(key)
         //   console.log(key2)
            inquirer.prompt(invec).then(answers => {
                const iv = answers['iv']
                const iv2 = Buffer.from(iv, 'hex')
                function decrypt(text) {
                    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv2)
                    var dec = decipher.update(text, 'hex', 'utf8')
                    dec += decipher.final('utf8');
                    return dec;
                }
                var decrypted = decrypt(text)
                console.log(lang["msg.decode.res"] + decrypted)
            })
         
        })
    } else {

        inquirer.prompt(invec).then(answers => {

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
  //      var decrypted = decrypt(text)
    //    console.log(lang["msg.decode.res"] + decrypted)
    }
})