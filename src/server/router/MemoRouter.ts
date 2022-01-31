import express from "express";
import handler from "../handler/MemoHandler";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
    handler.getAllMemo(req, res);
});

router.get("/:id", (req: express.Request, res: express.Response) => {
    handler.getMemoDetail(req, res);
});

router.post("/", (req: express.Request, res: express.Response) => {
    handler.addMemo(req, res);
});

router.put("/:id", (req: express.Request, res: express.Response) => {
    handler.updateMemo(req, res);
});

router.delete("/:id", (req: express.Request, res: express.Response) => {
    handler.deleteMemo(req, res);
});

export default router;
