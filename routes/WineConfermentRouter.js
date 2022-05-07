const express = require('express');
const router = express.Router();
const wineConfermentController = require("../controllers/WineConfermentController");

router.get("/wineConferment/:id", wineConfermentController.getOneWineConferment);
router.post("/wineConferment", wineConfermentController.postWineConferment);
module.exports = router;
