const express = require("express");
const path = require("path");

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('dist'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, './dist/admin.html'));
});

app.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, './dist/signupsignin.html'));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, './dist/signupsignin.html'));
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, './dist/homepage.html'));
});

app.listen(port, () => {
    console.log("server running at port " + port);
});