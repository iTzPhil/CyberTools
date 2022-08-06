const inquirer = require('inquirer')
const crypto = require('crypto');
<<<<<<< Updated upstream
const config = require("../config.json")
var lang = require("../lang/en.json")
=======
const config = require(process.cwd() + "/src/config.json")
fs = require('fs');
const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/Desktop`;
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');
const notifier = require('node-notifier');


var lang = require(process.cwd() + "/src/lang/en.json")
>>>>>>> Stashed changes

if (config.lang == "en") {
    var lang = require("../lang/en.json")
} else if (config.lang == "de") {
    var lang = require("../lang/de.json")
} else if (config.lang == "es") {
    var lang = require("../lang/es.json")
}

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
            { name: lang["msg.encode.key1"], value: "1" },
            { name: lang["msg.encode.key2"], value: "2" },
            { name: lang["msg.encode.key3"], value: "3" },
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


inquirer.prompt(questions).then(answers => {
    const text = answers['text']
    var key = answers['keyc']
    

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

        if (answers['keyc'] == "1") {
            var key = config.key1
            var iv = Buffer.from(config.iv1, 'hex')
        } else if (answers['keyc'] == "2") {
            var key = config.key2
            var iv = Buffer.from(config.iv2, 'hex')
        } else if (answers['keyc'] == "3") {
            var key = config.key3
            var iv = Buffer.from(config.iv2, 'hex')
        }

            function decrypt(text) {
                var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
                var dec = decipher.update(text, 'hex', 'utf8')
                dec += decipher.final('utf8');
                return dec;
            }
            var decrypted = decrypt(text)
            console.log(lang["msg.decode.res"] + decrypted)
<<<<<<< Updated upstream
  //      var decrypted = decrypt(text)
    //    console.log(lang["msg.decode.res"] + decrypted)
=======

            fs.writeFile(desktopDir + '/decoding-' + uuidv4() + '.txt',lang["msg.decode.res"] + decrypted , function (err) {
                if (err) return console.log(err);
            });
            notifier.notify({
                title: config.name,
                icon: process.cwd() + '/src/assets/logo.png',
                message: lang["msg.file.created"]
              });
              inquirer.prompt(endproccess).then(answers => {
                process.exit()
              })

>>>>>>> Stashed changes
    }
})