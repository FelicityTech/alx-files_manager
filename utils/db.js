import { 
    MongoClient 
} from 'mongodb';
import {
    env,
} from 'process';

class DBClient{
    // connection to the mongodb server with class
    constructor() {
        this.host = process.env.DB_HOST || 'localhost';
        this.port = process.env.DB_PORT || 27017;
        this.database = process.env.DATABASE || 'file_manager';

        MongoClient(`mongodb://${this.host}:${this.port}`, {
            useNewUrlParser: true,
            useUnifieldTopology: true,
        }).connect().then((client) => {
            this.client =client;
            this.db = this.client.db(this.dbName);
        })
    }

    isAlive() {
        if(this.db) return true;
        return false;
    }
    async nbUsers() {
        try {
            const collection = this.db.collection('users').countDocuments();
            return collection;
        } catch (err) {
            throw new Error(`Unable to get number of users ${err.message}`)
        }
    }

    async nbFiles() {
        try{
            const collection = this.db.collection('files').countDocuments();
            return collection;
        } catch (err) {
            throw new Error(`Unable to get number of files ${err.message}`);
        }
    }

}

const dbClient =new DBClient();

export default dbClient;
