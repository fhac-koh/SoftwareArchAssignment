import express from "express";
import { createEngine } from "./createEngine";

import path from "path";
import cors from 'cors';

const app = express();

const isTsNodeDev = Object.keys(require.cache).some((path) =>
    path.includes("/ts-node-dev/")
);
const ext = isTsNodeDev ? "tsx" : "js";

app.use(express.static(path.join("./dist")));
app.use(cors())

app.set("views", path.join(__dirname, "..", "client"));
app.set("view engine", ext);
app.engine(ext, createEngine());

app.get('/api/test', (req, res) => {
    res.json({"test": __dirname})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(3000, () => {
    console.log("> Ready on http://localhost:3000/");
});
