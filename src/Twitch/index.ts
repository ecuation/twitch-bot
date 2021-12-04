import tmi = require('tmi.js');
import { ChatUserstate } from 'tmi.js';
import { OBSConnector } from '../Obs';

export class TwitchAPI {
    client = new tmi.client({
        identity: {
            username: process.env.TWITCH_USER,
            password: process.env.TWITCH_PASSWORD
        },
        channels: ['ecuationable']
    });

    obs = new OBSConnector();

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
        msg: string,
        self: boolean
    ): Promise<void> {
        if (self) {
            return;
        } // Ignore messages from the bot

        const commandName = msg.trim();

        if (commandName === '!camfuera') {
            this.hideMainCam();
        }
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
}

// (async () => {
//     const twitch = new TwitchAPI();
//     await twitch.connectOBS();
//     await twitch.hideMainCam();

//     console.log(twitch);
// })();
