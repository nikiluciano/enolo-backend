const express = require('express');
const router = express.Router();
const auth = require("../middlewares/Auth")
const admin= require("../middlewares/AdminAuth")
const wineConfermentController = require("../controllers/WineConfermentController");

router.get("/wineConferment/:id",auth,  wineConfermentController.getOneWineConferment);
router.patch("/wineConferment/bottlingProcess/:id",auth, wineConfermentController.updateBottlingProcess);
router.patch("/wineConferment/winePressingProcess/:id",auth, wineConfermentController.updateWinePressingProcess);
router.patch("/wineConferment/destemmingProcess/:id",auth, wineConfermentController.updateDestemmingProcess);
router.patch("/wineConferment/winemakingProcess/:id",auth, wineConfermentController.updateWinemakingProcess);
router.patch("/wineConferment/rackingProcess/:id",auth, wineConfermentController.updateRackingProcess);
router.patch("/wineConferment/refinementProcess/:id",auth, wineConfermentController.updateRefinementProcess);
router.get("/wineConferment",auth, wineConfermentController.getAllWineConferment);
router.get("/wineConferments/filters", auth, wineConfermentController.getConfermentsByFilters);
router.post("/wineConferment",auth,  wineConfermentController.postWineConferment);
router.delete("/wineConferment/:username", auth, admin, wineConfermentController.deleteWineConferment); // "username" in path is logged user

module.exports = router;
