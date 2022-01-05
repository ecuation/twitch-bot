import * as dotenv from 'dotenv';
import { TwitchAPI } from './Twitch';
import * as path from 'path';
import { BotsDB } from './Bots';
dotenv.config();

//global declarations
declare global {
    var appRoot: string;
}
global.appRoot = path.resolve(__dirname);
class App {
    twitchClient: TwitchAPI;
    constructor() {
        this.twitchClient = new TwitchAPI();
    }
}

(async () => {
    const botsDB = new BotsDB();
    botsDB.writeFile();
    console.log(botsDB.checkUserIsHuman('nightbot'));
    const twitchClient = new App().twitchClient;
    // twitchClient.connect();
    // const db = new Database();
    // const user = { username: 'Manolo el del bombo' };
    // await db.insertNewBot(user);
})();
