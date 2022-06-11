const express = require('express');
const router = express.Router();
const auth = require("../middlewares/Auth")
const admin= require("../middlewares/AdminAuth")
const wineConfermentController = require("../controllers/WineConfermentController");

router.use(auth);

router.get("/:id", wineConfermentController.getOneWineConferment);
router.patch("/bottling_process/:id", wineConfermentController.updateBottlingProcess);
router.patch("/wine_pressing_process/:id", wineConfermentController.updateWinePressingProcess);
router.patch("/destemming_process/:id", wineConfermentController.updateDestemmingProcess);
router.patch("/wine_making_process/:id", wineConfermentController.updateWinemakingProcess);
router.patch("/racking_process/:id", wineConfermentController.updateRackingProcess);
router.patch("/refinement_process/:id", wineConfermentController.updateRefinementProcess);
router.get("", wineConfermentController.getAllWineConferment);
router.get("/filters", wineConfermentController.getConfermentsByFilters);
router.post("", wineConfermentController.postWineConferment);
router.delete("/:username", admin, wineConfermentController.deleteWineConferment); // "username" in path is logged user

module.exports = router;
