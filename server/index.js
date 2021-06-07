const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const festRoutes = require("./routes/fest");
const client = require("./configs/database");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).send(`server responding correctly...`);
});

app.use("/auth",authRoutes);
app.use("/user",userRoutes);
app.use("/fest",festRoutes);

client.connect(() => {
    console.log(`database connected`);
})

app.listen(port,()=>{
    console.log("server running at port "+port);
});