const express = require("express");
const mongoose = require("mongoose")
const app = express();
require("dotenv/config");

const port = process.env.PORT
const dbUrl = process.env.DB_URL

app.get("/", (req, res) => {
    res.send("Welcome to enolo's backend");
})

//Connect to DB
mongoose.connect(
    dbUrl,
    { useNewUrlParser: true },
    () => console.log("Connected to DB!")
);

//Create server
app.listen(port, function () {
    console.log("Server is running on port: " + port);
});
