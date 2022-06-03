const express = require('express');
const router = express.Router();
const supplierController = require("../controllers/SuppliersController");
const auth = require ("../middlewares/Auth");

router.use(auth);  //To verify in every routes if user is logged

router.get("/suppliers",supplierController.getAllSuppliers);
router.get("/suppliers/:username",supplierController.getOneSupplier);
router.post("/supplier",supplierController.insertSupplier);
router.patch("/supplier/:id",supplierController.updateSupplier);

module.exports = router;