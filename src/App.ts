
require('dotenv').config();
import { OBSConnector } from './Obs/Obs';

class App {

    OBSConnector: OBSConnector;

    constructor() {
        this.OBSConnector = new OBSConnector;
    }
}
(async () => {
    const OBSManager = new App().OBSConnector;
    await OBSManager.connect();

    const currentScene = await OBSManager.getCurrentScene();
    if(currentScene.name !== 'Gameplay') OBSManager.switchToScene('Gameplay');
})();
