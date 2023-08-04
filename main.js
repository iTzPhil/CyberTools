const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const modules = require('./src/code/modules.js');
const config = require('./src/config.json');
const fs = require('fs');


let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 960,
        height: 540,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: path.join(__dirname, 'src/html/icons/icon.ico'),
        dark: true
    });

    mainWindow.loadFile('./src/html/index.html');
}

app.on('ready', createWindow);

// Encode
ipcMain.on('encode', (event, arg) => {
    try {
    var encoded = modules.encode(arg, config.key1, Buffer.from(config.iv1, 'hex'));
    event.reply('encoded', encoded);
    } catch (err) {
        event.reply('encoded', err);
    }
});

// Decode
ipcMain.on('decode', (event, arg) => {
    try {
    var decoded = modules.decode(arg, config.key1, Buffer.from(config.iv1, 'hex'));
    event.reply('decoded', decoded);
    } catch (err) {
        event.reply('decoded', err);
    }
});

// GeoIP
ipcMain.on('geoip', async (event, arg) => {
    try {
    var geoip = await modules.geoip(arg);
    event.reply('geoipres', geoip);
    } catch (err) {
        event.reply('geoipres', err);
    }
});

// Password Generator
ipcMain.on('generate', (event, arg) => {
    try {
        var password = modules.passwordGen(arg.length, arg.numbers, arg.symbols, arg.uppercase, arg.lowercase);
        event.reply('generated', password);
    } catch (error) {
        event.reply('generated', error);
    }
});

// QR Code Generator
ipcMain.on('qr', async (event, arg) => {
    try {
        var qr = await modules.qrCode(arg);
        event.reply('qrres', qr);
    } catch (error) {
        event.reply('qrres', error);
    }
});

// Conceal
ipcMain.on('conceal', (event, arg) => {
    try {
        var img = fs.readFileSync(arg.file);
        var text = modules.encode(arg.text, config.steganokey, Buffer.from(config.steganoiv, 'hex'));
        var concealed = modules.conceal(img, text);
        event.reply('concealed', concealed);
    } catch (error) {
        event.reply('concealed', {error: error.toString()});
    }
});

// Reveal
ipcMain.on('reveal', (event, arg) => {
    try {
        var img = fs.readFileSync(arg);
        var revealed = modules.reveal(img);
        var text = modules.decode(revealed, config.steganokey, Buffer.from(config.steganoiv, 'hex'));
        event.reply('revealed', text);
    }
    catch (error) {
        event.reply('revealed', error);
    }
});