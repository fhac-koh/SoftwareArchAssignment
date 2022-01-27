import express from "express";
import repository from "../repository/MemoRepository";

export default class handler {
    static getAllMemo(req: express.Request, res: express.Response) {
        repository.getAllMemo().then(() => {
            res.send("test")
        })
    }
}
