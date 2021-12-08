import tmi = require('tmi.js');
import { ChatUserstate } from 'tmi.js';
import { OBSConnector } from '../Obs';
import { Commands } from '../Shared/Models';

export class TwitchAPI {
    client = new tmi.client({
        identity: {
            username: process.env.TWITCH_USER,
            password: process.env.TWITCH_PASSWORD
        },
        channels: ['ecuationable']
    });

    obs = new OBSConnector();

    commands: Commands = {
        '!camfuera': 'hideMainCam',
        '!fullscreen': 'fullScreenScene',
        '!welcome': 'welcomeMessage'
    };

    lastTimeRaided: Date = this.addMinutes(new Date(), 1);

    constructor() {
        this.client.on(
            'message',
            (
                target: string,
                context: ChatUserstate,
                msg: string,
                self: boolean
            ) => {
                this.onMessageHandler(target, context, msg, self);
            }
        );

        this.client.on('raided', (channel, username, viewers) => {
            this.lastTimeRaided = this.addMinutes(new Date(), 5);
            this.writeMessage(
                `El usuario ${username} ha enviado una raid con ${viewers} espectadores. Gracias!`
            );
        });

        this.client.on('join', (channel, username) => {
            const currentTime = new Date();
            const lastTimeRaided = this.lastTimeRaided;
            if (currentTime.valueOf() > lastTimeRaided.valueOf()) {
                this.welcomeMessage();
            }
        });
    }

    addMinutes(date: Date, minutes: number): Date {
        return new Date(date.getTime() + minutes * 60000);
    }

    async connect() {
        this.connectTwitch();
        await this.connectOBS();
    }

    connectTwitch() {
        this.client.connect();
    }

    async connectOBS() {
        await this.obs.connect();
    }

    async onMessageHandler(
        target: string,
        context: ChatUserstate,
        msg: any,
        self: boolean
    ): Promise<void> {
        if (self) {
            return;
        } // Ignore messages from the bot
        const commandName: '!camfuera' | '!fullscreen' = msg.trim();
        const dynamicMethod: 'hideMainCam' | 'fullScreenScene' =
            this.commands[commandName];

        if (dynamicMethod) this[dynamicMethod]();
    }

    async hideMainCam(): Promise<void> {
        const itemName = 'Main cam group';
        const currentStatus = await this.obs.getItemCurrentStatus(itemName);
        if (!currentStatus.visible) return;

        await this.obs.hideItemFromCurrentScene(itemName);

        setTimeout(async () => {
            await this.obs.showItemFromCurrentScene(itemName);
        }, 3000);
    }

    async fullScreenScene() {
        const currentScene = await this.obs.getCurrentScene();
        if (currentScene.name === 'Ending') return;
        await this.obs.switchToScene('Gameplay');
    }

    writeMessage(message: string): void {
        this.client.say('ecuationable', message);
    }

    welcomeMessage(): void {
        this.writeMessage(`Escribe !r para reproducir tu mensaje.`);
        this.writeMessage(
            `Comandos disponibles: !saludo, !fua, !reanimacion, !reglas`
        );
        this.writeMessage(
            `Comandos stream: !camfuera, !wenanoshe, !cerrar, !grande, !pequeña`
        );
    }
}
