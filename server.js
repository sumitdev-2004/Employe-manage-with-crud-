const dotenv = require('dotenv');
const myDB = require('./config/db');
dotenv.config();
const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
const studentroutes = require('./routes/employe-routes');
const sessioninfo = require("./config/session");


app = express()
app.use(bodyParse.json());
myDB();
app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}))
app.use(sessioninfo);
app.use("/", studentroutes);


app.listen(process.env.PORT, () => {
    console.log("Server Is working on web", process.env.PORT);
})