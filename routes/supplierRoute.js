const express = require('express');
const router = express.Router();
const supplierController = require("../controllers/suppliersController");


router.get("/suppliers",supplierController.getAllSuppliers);
router.get("/suppliers/:username",supplierController.getOneSupplier);
router.post("/supplier",supplierController.insertSupplier);

module.exports = router;