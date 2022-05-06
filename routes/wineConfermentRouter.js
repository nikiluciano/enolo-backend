const express = require('express');
const router = express.Router();
const wineConfermentController = require("../controllers/wineConfermentController");

router.get("/wineConferment/:_id",wineConfermentController.getOneWineConferment);
router.post("/wineConferment/", wineConfermentController.postWineConferment);
module.exports = router;


