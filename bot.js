require('dotenv').config()

const tmi = require('tmi.js');
// var robot = require("robotjs");
// var ks = require('node-key-sender');
// const sendKeys = require('sendkeys-macos');
const { exec } = require('child_process');
const {ObsWs} = require('./obs');

(async () => {
  const OBS = await ObsWs.connect();
    // Define configuration options
  const opts = {
    identity: {
      username: process.env.TWITCH_USER,
      password: process.env.TWITCH_PASSWORD
    },
    channels: [
      'ecuationable'
    ]
  };

  // Create a client with our options
  const client = new tmi.client(opts);

  // Register our event handlers (defined below)
  client.on('message', onMessageHandler);
  client.on('connected', onConnectedHandler);
  client.on('join', (channel, username) => {
    // if(!['lurxx', 'icewizerds','ecuationable', 'cyndyka', 'ftopayr', 'nightbot', 'Own3d', 'nightbot', 'own3d', 'anotherttvviewer', 'droopdoggg', 'uncle_spawn', 'sophikal'].includes(username)) {
    //   console.log(`* User ${username} has joined.`);
    //   defaultText();
    // }
  });

// Connect to Twitch:
client.connect();
  // Called every time a message comes in
  function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    if (commandName === '!camfuera') hideMainCam();

    if (commandName === '!wenanoshe') wenanoshe();

    if (commandName === '!cerrar') closeStream();

    if(commandName === '!grande') fullScreenScene();

    if(commandName === '!pequeña') frameScreenScene();

    // If the command is known, let's execute it
    if (commandName === '!comandos') {
      defaultText();
    } 
    
    if (commandName === '!reglas') {
      chatRulesText();
    }
  }

  const defaultText = () => {
    writeMessage(`Escribe !r para reproducir tu mensaje.`);
    writeMessage(`Comandos disponibles: !saludo, !fua, !reanimacion, !reglas`);
    writeMessage(`Comandos stream: !camfuera, !wenanoshe, !cerrar, !grande, !pequeña`);
  };

  const chatRulesText = () => {
    writeMessage(`
    - Requisitos para unirte a jugar a multiplayer:
  1) NO INSISTIR, espera a que el admin pregunte si alguien se quiere unir.
  2) Tener un buen mic o auriculares gamer (no eco y audio claro), queremos disfrutar todos de una conversación
  clara.
  3) Solo jugadores del mismo nivel, no expertos chetados, queremos disfrutar de la experiencia del juego al máximo.
  - No spam.
  - Se respetuoso.
  - Backseat gaming es bien.
    `);
  }

  function wenanoshe()
  {
    exec('afplay ./sounds/wenanoshe.mp3', () => {console.log('audio played');});
    //sendKeys('OpenEmu', 'a', { delay: 0.1, initialDelay: 1 });
    //sendKeys('Notes', 'hello<c:a:command><c:c:command><c:right> <c:v:command>', { delay: 0.1, initialDelay: 1 });
    //robot.keyTap("enter");
    //ks.sendKey('enter');
    //robot.typeString("a");
  }

  function writeMessage(message) {
      client.say('ecuationable', message);
  }

  // Called every time the bot connects to Twitch chat
  function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
  }

  async function hideMainCam() {
    const itemName = 'Main cam group';
    const currentStatus = await OBS.getItemCurrentStatus(itemName);
    if( ! currentStatus.visible) return;

    OBS.hideItemFromCurrentScene(itemName);
  
    wenanoshe();
    setTimeout(()=>{OBS.showItemFromCurrentScene(itemName)}, 3000);
  }

  async function fullScreenScene() {
    const currentScene = await OBS.getCurrentScene();
    if(currentScene.name === 'Ending') return;
    await OBS.switchToScene('Gameplay');
  }

  async function frameScreenScene() {
    const currentScene = await OBS.getCurrentScene();
    if(currentScene.name === 'Ending') return;
    await OBS.switchToScene('GameplayFramed');
  }

  async function closeStream() {
    const currentScene = await OBS.getCurrentScene();
    if(currentScene.name === 'Ending') return;
    
    await OBS.switchToScene('Ending');
    setTimeout(()=>{OBS.switchToScene(currentScene.name)}, 3000);
  }

})();