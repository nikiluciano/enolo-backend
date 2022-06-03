const express = require('express');
const router = express.Router();
const supplierController = require("../controllers/SuppliersController");
const auth = require ("../middlewares/Auth");

router.use(auth);

router.get("",supplierController.getAllSuppliers);
router.get("/:id",supplierController.getOneSupplier);
router.post("",supplierController.insertSupplier);
router.patch("/:id",supplierController.updateSupplier);

module.exports = router;
