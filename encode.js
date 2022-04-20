const inquirer = require('inquirer')

var questions = [
  {
    type: 'input',
    name: 'text',
    message: "What do you want to encode?"
  },
  {
    type: 'input',
    name: 'key',
    message: "Which key do you want to use?"
  }
]

inquirer.prompt(questions).then(answers => {
  console.log(`Text: ${answers['text']}!`)
  console.log(`Key: ${answers['key']}!`)
})