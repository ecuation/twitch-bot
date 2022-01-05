import { Store, User } from '../Shared/Models';
import * as Nedb from 'nedb';
import * as path from 'path';

export class Database implements Store {
    private database: Nedb;

    constructor() {
        const pathDir = path.join(__dirname);
        this.database = new Nedb(`${pathDir}/database.db`);
        this.database.loadDatabase();
    }

    updateBotsDB() {}

    checkIsAHuman() {}

    async insertNewBot(user: User): Promise<any> {
        return new Promise((resolve, reject) => {
            this.database.insert(user, (err: Error | null, docs: any) => {
                if (err) {
                    return reject(err);
                }
                return resolve(docs);
            });
        });
    }
}
