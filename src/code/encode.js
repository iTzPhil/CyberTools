const inquirer = require('inquirer')
const crypto = require('crypto');
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


if (config.lang == "en") {
    var lang = require(process.cwd() + "/src/lang/en.json")
} else if (config.lang == "de") {
    var lang = require(process.cwd() + "/src/lang/de.json")
} else if (config.lang == "es") {
    var lang = require(process.cwd() + "/src/lang/es.json")
}

var questions = [
    {
        type: 'input',
        name: 'text',
        prefix: '',
        message: lang["msg.encode.text"]
    },
    {
        type: 'list',
        name: 'keyc',
        message: lang["msg.encode.keyc"],
        prefix: '',
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
        prefix: '',
        message: lang["msg.encode.key"]
    }
]

var endproccess = [
    {
        type: 'input',
        name: 'end',
        prefix: '',
        message: lang["msg.end"]
    }
]

inquirer.prompt(questions).then(answers => {
    const text = answers['text']
    var key = answers['keyc']
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

        fs.writeFile(desktopDir + '/encoding-' + uuidv4() + '.txt', lang["msg.encode.res.text"] + encrypted + "\n" + lang["msg.encode.res.iv"] + iv.toString('hex') + "\n" + lang["msg.encode.res.key"] + key, function (err) {
            if (err) return console.log(err);
        });
        notifier.notify({
            title: config.name,
            message: lang["msg.file.created"],
            icon: process.cwd() + '/src/assets/logo.png'
            message: lang["msg.file.created"]
          });
          inquirer.prompt(endproccess).then(answers => {
            process.exit()
          })

    }



})

