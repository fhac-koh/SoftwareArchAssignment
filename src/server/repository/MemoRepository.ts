import { MongoClient, ObjectId } from "mongodb";

const DBName = "Memo";
const DBURL = "mongodb://localhost:27017";

interface InputProps {
    title: string;
    text: string;
    date?: Date;
}

export default class repository {
    static async getAllMemo() {
        const client = await MongoClient.connect(DBURL);
        if (!client) {
            return null;
        }
        const db = client.db(DBName);
        const memos = await db.collection(DBName).find().toArray();
        client.close();
        return { memoList: memos };
    }

    static async getMemoDetail(id: ObjectId) {
        const client = await MongoClient.connect(DBURL);
        if (!client) {
            return null;
        }
        const db = client.db(DBName);
        const memo = await db.collection(DBName).findOne({ _id: id });
        client.close();
        return memo;
    }

    static async addMemo(params: InputProps) {
        const memo: InputProps = params;
        memo.date = new Date();
        const client = await MongoClient.connect(DBURL);
        if (!client) {
            return null;
        }
        const db = client.db(DBName);
        const res = await db.collection(DBName).insertOne(memo);
        client.close();
        return res.acknowledged;
    }

    static async updateMemo(id: ObjectId, params: InputProps) {
        const memo: InputProps = params;
        memo.date = new Date();
        const client = await MongoClient.connect(DBURL);
        if (!client) {
            return null;
        }
        const db = client.db(DBName);
        const res = await db
            .collection(DBName)
            .updateOne({ _id: id }, { $set: memo });
        client.close();
        return res.acknowledged;
    }

    static async deleteMemo(id: ObjectId) {
        const client = await MongoClient.connect(DBURL);
        if (!client) {
            return null;
        }
        const db = client.db(DBName);
        const res = await db.collection(DBName).deleteOne({ _id: id });
        client.close();
        return res.acknowledged;
    }
}
