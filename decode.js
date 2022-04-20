const inquirer = require('inquirer')
const crypto = require('crypto');

var questions = [
    {
        type: 'input',
        name: 'text',
        message: "What do you want to decode?"
    },
    {
        type: 'input',
        name: 'key',
        message: "Which key do you want to use? (32 characters)"
    },
    {
        type: 'input',
        name: 'iv',
        message: "Which iv do you want to use?"
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
    console.log('The decoded text is:' + decrypted)
})