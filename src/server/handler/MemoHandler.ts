import express from "express";
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
}
