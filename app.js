const express = require("express");
const app = express();
require("dotenv/config");

const port = process.env.PORT

app.get("/welcome", (req, res) => {
    res.send("Welcome to enolo's backend");
})

app.listen(port, function () {
    console.log("Server is running on port: " + port);
});
