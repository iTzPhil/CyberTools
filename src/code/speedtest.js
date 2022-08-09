const FastSpeedtest = require("fast-speedtest-api");
const inquirer = require('inquirer')
const config = require(process.cwd() + "/src/config.json")
fs = require('fs');
const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/Desktop`;
const notifier = require('node-notifier');
const { DeterminateBar } = require('node-loading');
const loading = DeterminateBar();

if (config.lang == "en") {
    var lang = require(process.cwd() + "/src/lang/en.json")
} else if (config.lang == "de") {
    var lang = require(process.cwd() + "/src/lang/de.json")
} else if (config.lang == "es") {
    var lang = require(process.cwd() + "/src/lang/es.json")
}

var startproccess = [
    {
        type: 'input',
        name: 'start',
        prefix: '',
        message: lang["msg.speedtest.start"]
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

inquirer.prompt(startproccess).then(answers => {
let speedtest = new FastSpeedtest({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", 
    verbose: false, 
    timeout: 10000,
    https: true,
    urlCount: 5, 
    bufferSize: 8, 
    unit: FastSpeedtest.UNITS.Mbps 
})

let progress = 0;
loading.remainingColor = "red"
loading.completeColor = "green"
const intervalId = setInterval(() => {
  loading.setProgress(++progress);

  if (progress === 100) {
    loading.stop();
    clearInterval(intervalId);
  }
}, 100);

speedtest.getSpeed().then(s => {
    var res = (lang["msg.speedtest.result"] + `${s} Mbps`)
    console.log(res);
    notifier.notify({
        title: config.name,
        icon: process.cwd() + '/src/assets/logo.png',
        message: res
      })
      inquirer.prompt(endproccess).then(answers => {
        process.exit()
    })
}).catch(e => {
    console.error(e.message);
})



})