const express = require("express");
const path = require("path");

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('dist'));
app.use(express.static('anim'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, './admin.html'));
});

app.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, './signupsignin.html'));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, './signupsignin.html'));
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, './homepage.html'));
});

app.get("/tandc", (req, res) => {
    res.sendFile(path.join(__dirname, './terms_and_conditions.html'));
});

app.listen(port, () => {
    console.log("server running at port " + port);
});