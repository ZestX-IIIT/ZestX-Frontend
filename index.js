const express = require("express");
const path = require("path");

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('dist'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, './dist/signupsignin.html'));
});

app.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, './dist/signupsignin.html'));
});

app.listen(port, () => {
    console.log("server running at port " + port);
});