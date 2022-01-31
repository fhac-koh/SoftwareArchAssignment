import express from "express";
import { ObjectId } from "mongodb";
import repository from "../repository/MemoRepository";

export default class handler {
    static getAllMemo(req: express.Request, res: express.Response) {
        repository
            .getAllMemo()
            .then((memo) => {
                res.send(memo);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static getMemoDetail(req: express.Request, res: express.Response) {
        const objectid = new ObjectId(req.params.id);
        repository
            .getMemoDetail(objectid)
            .then((memo) => {
                res.send(memo);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static addMemo(req: express.Request, res: express.Response) {
        const memo = req.body;
        repository
            .addMemo(memo)
            .then(() => {
                res.send("Add to Database");
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static updateMemo(req: express.Request, res: express.Response) {
        const objectid = new ObjectId(req.params.id);
        const memo = req.body;
        repository
            .updateMemo(objectid, memo)
            .then(() => {
                res.send("Add to Database");
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static deleteMemo(req: express.Request, res: express.Response) {
        const objectid = new ObjectId(req.params.id);
        repository
            .deleteMemo(objectid)
            .then(() => {
                res.send("Add to Database");
            })
            .catch((err) => {
                res.send(err);
            });
    }
}
