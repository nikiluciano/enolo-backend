const express = require('express');
const router = express.Router();
const auth = require("/middlewares/Auth")
const wineConfermentController = require("../controllers/WineConfermentController");


router.get("/wineConferment/:id",auth,  wineConfermentController.getOneWineConferment);
router.patch("/wineConferment/:id",auth, wineConfermentController.updateWineConferment);
router.get("/wineConferment",auth, wineConfermentController.getAllWineConferment);
router.post("/wineConferment",auth,  wineConfermentController.postWineConferment);
router.delete("/wineConferment/:id",auth,  wineConfermentController.deleteWineConferment);
module.exports = router;
