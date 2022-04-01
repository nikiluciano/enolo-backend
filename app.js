const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to enolo's backend");
})

app.listen("4000", function () {
    console.log("Server is running on port 4000");
});
