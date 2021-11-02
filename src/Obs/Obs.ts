import ObsWebSocket = require("obs-websocket-js");
import { Scene } from '../Shared/Models'

export class OBSConnector {

    obs: ObsWebSocket;

    constructor() {
        this.obs = new ObsWebSocket();
    }

    async connect(): Promise<void> {
        try{
            await this.obs.connect({
                address: process.env.OBS_HOST, 
                password: process.env.OBS_PASSWORD
            });

            console.log('OBS connection success!');
        
        }catch (error) {
            console.log('OBS cannot be connected: ', error);
        }
    }

    async switchToScene(sceneName: string): Promise<void> {
        try {
            await this.obs.send('SetCurrentScene', {
                'scene-name': sceneName
            });
            console.log(`Scene changed to: ${sceneName}`);
            
        }catch(error){
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
}