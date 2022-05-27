const express = require('express');
const router = express.Router();
const auth = require("../middlewares/Auth")
const wineConfermentController = require("../controllers/WineConfermentController");

router.get("/wineConferment/:id",auth,  wineConfermentController.getOneWineConferment);
//router.patch("/wineConferment/confermentProcess/:id",auth, wineConfermentController.updateConfermentProcess);
router.patch("/wineConferment/bottlingProcess/:id",auth, wineConfermentController.updateBottlingProcess);
router.patch("/wineConferment/winePressingProcess/:id",auth, wineConfermentController.updateWinePressingProcess);
router.patch("/wineConferment/destemmingProcess/:id",auth, wineConfermentController.updateDestemmingProcess);
router.patch("/wineConferment/winemakingProcess/:id",auth, wineConfermentController.updateWinemakingProcess);
router.patch("/wineConferment/rackingProcess/:id",auth, wineConfermentController.updateRackingProcess);
router.patch("/wineConferment/refinementProcess/:id",auth, wineConfermentController.updateRefinementProcess);
router.get("/wineConferment",auth, wineConfermentController.getAllWineConferment);
router.post("/wineConferment",auth,  wineConfermentController.postWineConferment);
router.delete("/wineConferment/:id",auth,  wineConfermentController.deleteWineConferment);
module.exports = router;
