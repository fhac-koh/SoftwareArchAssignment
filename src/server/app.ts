import express from "express";
import { createEngine } from "./createEngine";

const app = express();
import path from "path";

const isTsNodeDev = Object.keys(require.cache).some((path) =>
    path.includes("/ts-node-dev/")
);
const ext = isTsNodeDev ? "tsx" : "js";
app.set("views", path.join(__dirname, "../client"));
app.set("view engine", ext);
app.engine(ext, createEngine());

app.get("/:name", (req, res) => {
    res.render("Hello", { name: req.params.name });
});

app.listen(8080, () => {
    console.log("> Ready on http://localhost:8080/");
});
