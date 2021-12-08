import ObsWebSocket = require('obs-websocket-js');
import { ItemProperties, Scene } from '../Shared/Models';

export class OBSConnector {
    obs: ObsWebSocket;

    constructor() {
        this.obs = new ObsWebSocket();
    }

    async connect(): Promise<void> {
        try {
            await this.obs.connect({
                address: process.env.OBS_HOST,
                password: process.env.OBS_PASSWORD
            });

            console.log('OBS connection success!');
        } catch (error) {
            console.log('OBS cannot be connected: ', error);
        }
    }

    async switchToScene(sceneName: string): Promise<void> {
        try {
            await this.obs.send('SetCurrentScene', {
                'scene-name': sceneName
            });
            console.log(`Scene changed to: ${sceneName}`);
        } catch (error) {
            console.log('Scene cannot be changed: ', error);
        }
    }

    async getCurrentScene(): Promise<Scene> {
        return new Promise(async (resolve, reject) => {
            try {
                const scene = await this.obs.send('GetCurrentScene');
                resolve(scene);
            } catch (error) {
                reject(error);
            }
        });
    }

    async getItemCurrentStatus(itemName: string): Promise<ItemProperties> {
        const currentScene = await this.getCurrentScene();
        return await this.obs.send('GetSceneItemProperties', {
            'scene-name': currentScene.name,
            item: { name: itemName }
        });
    }

    async showItemFromCurrentScene(itemName: string) {
        await this.setItemVisibleTo(itemName, true);
    }

    async hideItemFromCurrentScene(itemName: string) {
        await this.setItemVisibleTo(itemName, false);
    }

    async setItemVisibleTo(itemName: string, status: boolean) {
        const currentScene = await this.getCurrentScene();
        await this.obs.send('SetSceneItemProperties', {
            'scene-name': currentScene.name,
            visible: status,
            item: { name: itemName },
            bounds: {},
            scale: {},
            crop: {},
            position: {}
        });
    }
}
