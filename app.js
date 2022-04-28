const express = require("express");
const mongoose = require("mongoose")
const signUp = require ('./Routers/signUp');
const bodyParser = require('body-parser');
const app = express();
require("dotenv/config");

const port = process.env.PORT
const dbUrl = process.env.DB_URL

app.use(bodyParser.json());
app.use(signUp);



app.get("/welcome", (req, res) => {
    res.send("Welcome to enolo's backend");
})

//DB connection
mongoose.connect(
    dbUrl,
    { useNewUrlParser: true },
    () => console.log("Connected to DB!")
);


//Create server
app.listen(port, function () {
    console.log("Server is running on port: " + port);
});
