const inquirer = require('inquirer');
const crypto = require('crypto');
const steggy = require('steggy');
const fs = require('fs');
const os = require('os');
const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/Desktop`;
const config = require("../config.json");
const notifier = require('node-notifier');
const { v4: uuidv4 } = require('uuid');

if (config.lang == "en") {
  var lang = require(process.cwd() + "/src/lang/en.json")
}
else if (config.lang == "de") {
  var lang = require(process.cwd() + "/src/lang/de.json")
}
else if (config.lang == "es") {
  var lang = require(process.cwd() + "/src/lang/es.json")
}

const originalPathMsg = lang["msg.steg.path"]
const msg = originalPathMsg.split("'")
const p1 = msg[0]
const p2 = msg[1]
const p3 = msg[2]
const finalPathMsg = p1 + process.cwd() + p2 + p3
console.log(finalPathMsg)

inquirer.prompt([{
  type: 'list',
  name: 'mode',
  message: lang["msg.steg.mode"],
  prefix: '',
  choices: [
    { name: lang["msg.steg.mode.encode"], value: "encode" },
    { name: lang["msg.steg.mode.decode"], value: "decode" }
  ]
}]).then(answers => {
  if (answers.mode === "encode") {
    inquirer.prompt([{
      type: 'input',
      name: 'text',
      message: lang["msg.steg.text"],
      prefix: ''
    }, {
      type: 'input',
      name: 'path',
      message: finalPathMsg,
      prefix: ''
    }]).then(answers => {
      var text = answers.text
      let img = undefined
      try {
        img = fs.readFileSync(answers.path)
      } catch (err) {
        try {
          img = fs.readFileSync(process.cwd() + `/src/assets/steg-input/${answers.path}`)
        } catch (err) {
          console.log(lang["msg.steg.err"])
          inquirer.prompt([{
            type: 'input',
            name: 'end',
            prefix: '',
            message: lang["msg.end"]
          }]).then(answers => {
            process.exit()
          })
        }
      }
      var key = config.steganokey
      var iv = Buffer.from(config.steganoiv, 'hex')
      function encrypt(text) {
        var cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
      }
      var encrypted = encrypt(text);
      const concealed = steggy.conceal()(img, encrypted, 'utf8')
      fs.writeFileSync(`${desktopDir}/stegano-${uuidv4()}.png`, concealed);
      console.log(lang["msg.steg.done"])
      notifier.notify({
        title: config.name,
        icon: process.cwd() + '/src/assets/logo.png',
        message: lang["msg.steg.done"]
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
  } else if (answers.mode === "decode") {
    inquirer.prompt([{
      type: 'input',
      name: 'path',
      message: finalPathMsg,
      prefix: ''
    }]).then(answers => {
      let img = null
      try {
        img = fs.readFileSync(answers.path)
      } catch (err) {
        try {
          img = fs.readFileSync(process.cwd() + `/src/assets/steg-input/${answers.path}`)
        } catch (err) {
          console.log(lang["msg.steg.err"])
          inquirer.prompt([{
            type: 'input',
            name: 'end',
            prefix: '',
            message: lang["msg.end"]
          }]).then(answers => {
            process.exit()
          })
        }
      }

      var steg = steggy.reveal()(img, 'utf8')
      var key = config.steganokey
      var iv = Buffer.from(config.steganoiv, 'hex')

      function decrypt(text) {
        var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
        var dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
      }
      var decrypted = decrypt(steg);
      console.log(decrypted.toString());
      inquirer.prompt([{
        type: 'input',
        name: 'end',
        prefix: '',
        message: lang["msg.end"]
      }]).then(answers => {
        process.exit()
      })
    })
  }
})