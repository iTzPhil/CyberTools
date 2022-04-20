const inquirer = require('inquirer')
const crypto = require('crypto');

var questions = [
    {
        type: 'input',
        name: 'text',
        message: "What do you want to encode?"
    },
    {
        type: 'input',
        name: 'key',
        message: "Which key do you want to use? (32 characters)"}
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
    console.log(encrypted)
})