import express from "express";
import handler from "../handler/MemoHandler";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
    handler.getAllMemo(req, res);
});

router.post("/", (req: express.Request, res: express.Response) => {
    handler.addMemo(req, res);
});

export default router;
