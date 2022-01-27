import express from "express";
import handler from "../handler/MemoHandler";

const router = express.Router();

router.get("/", (req, res) => {
    handler.getAllMemo(req, res);
});

export default router;
