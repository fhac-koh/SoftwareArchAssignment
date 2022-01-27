import { MongoClient } from "mongodb";

const DBName = "Memo";
const DBURL = "mongodb://localhost:27017";

export default class repository {
    static async getAllMemo() {
        const client = await MongoClient.connect(DBURL);
        if (!client) {
            return null;
        }
        const db = client.db(DBName);
        const memos = await db.collection(DBName).find().toArray();
        client.close();
        return memos;
    }

    static async addMemo(params: any) {
        const memo = params;
        const client = await MongoClient.connect(DBURL);
        if (!client) {
            return null;
        }
        const db = client.db(DBName);
        const res = await db.collection(DBName).insertOne(memo);
        client.close();
        return res.acknowledged;
    }
}
