import express from "express";
import { createEngine } from "./createEngine";

const app = express();
import path from "path";

const isTsNodeDev = Object.keys(require.cache).some((path) =>
    path.includes("/ts-node-dev/")
);
const ext = isTsNodeDev ? "tsx" : "js";

app.use(express.static(path.join("./dist")));

app.set("views", path.join(__dirname, "../client"));
app.set("view engine", ext);
app.engine(ext, createEngine());

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(8080, () => {
    console.log("> Ready on http://localhost:8080/");
});
