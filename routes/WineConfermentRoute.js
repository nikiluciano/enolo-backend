const express = require('express');
const router = express.Router();
const auth = require("../middlewares/Auth")
const admin= require("../middlewares/AdminAuth")
const wineConfermentController = require("../controllers/WineConfermentController");

router.use(auth);

router.get("/wine_conferment/:id", wineConfermentController.getOneWineConferment);
router.patch("/wine_conferment/bottling_process/:id", wineConfermentController.updateBottlingProcess);
router.patch("/wine_conferment/wine_pressing_process/:id", wineConfermentController.updateWinePressingProcess);
router.patch("/wine_conferment/destemming_process/:id", wineConfermentController.updateDestemmingProcess);
router.patch("/wine_conferment/wine_making_process/:id", wineConfermentController.updateWinemakingProcess);
router.patch("/wine_conferment/racking_process/:id", wineConfermentController.updateRackingProcess);
router.patch("/wine_conferment/refinement_process/:id", wineConfermentController.updateRefinementProcess);
router.get("/wine_conferment", wineConfermentController.getAllWineConferment);
router.get("/wine_conferments/filters", wineConfermentController.getConfermentsByFilters);
router.post("/wine_conferment", wineConfermentController.postWineConferment);
router.delete("/wine_conferment/:username", admin, wineConfermentController.deleteWineConferment); // "username" in path is logged user

module.exports = router;
