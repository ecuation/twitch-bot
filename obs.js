const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();

const ObsWs = {
    obs: new OBSWebSocket(),
    async connect () {
        await this.obs.connect({
            address: process.env.OBS_HOST, 
            password: process.env.OBS_PASSWORD
        });

        console.log('* OBS websocket connection success');
        return this;
    },
    async getCurrentScene() {
        return await this.obs.send('GetCurrentScene');
    },
    async switchToScene(sceneName) {
        await this.obs.send('SetCurrentScene', {
            'scene-name': sceneName
        });
    },
    async getItemCurrentStatus(itemName) {
        const currentScene = await this.getCurrentScene();
        return await this.obs.send('GetSceneItemProperties', {
            'scene-name': currentScene.name,
            'item': itemName
        });
    },
    async hideItemFromCurrentScene(itemName) {
        this.setItemVisibleTo(itemName, false);
    },
    async showItemFromCurrentScene(itemName) {  
        this.setItemVisibleTo(itemName, true);
    },
    async setItemVisibleTo(itemName, status) {
        console.log(itemName, status);
        const currentScene = await this.getCurrentScene();
        await this.obs.send('SetSceneItemProperties', {
            'scene-name': currentScene.name,
            visible: status,
            item: itemName,
            bounds: {},
            scale: {},
            crop: {},
            position: {},
        });
    }
};

module.exports = { ObsWs };