const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");

const auth = require("./middlewares/Auth");

const supplierRoute = require("./routes/SupplierRoute");
const login = require("./routes/Login");
const signUp = require('./routes/SignUp');
const wineConfermentRoute = require("./routes/WineConfermentRoute");
const warehouseRoute = require("./routes/WarehouseRoute");
const userRoute = require("./routes/UserRoute");

const app = express();

require("dotenv/config");

const port = process.env.PORT
const dbUrl = process.env.DB_URL

app.use(bodyParser.json());
app.use(cors());

app.use(login);
app.use(signUp);
app.use(supplierRoute);
app.use(wineConfermentRoute);
app.use("/users",userRoute);
app.use("/warehouse", warehouseRoute);

app.get("/welcome", auth,  (req, res) => {
    res.send("Welcome to enolo's backend");
});

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
