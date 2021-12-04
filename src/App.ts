require('dotenv').config();
import { TwitchAPI } from './Twitch';

class App {
    twitchClient: TwitchAPI;
    constructor() {
        this.twitchClient = new TwitchAPI();
    }
}

(async () => {
    const twitchClient = new App().twitchClient;
    twitchClient.connect();
})();
