const supplier = require("../models/Supplier");
const conferment = require("../models/WineConferment")

exports.getStatsSupplierQuantity = [
    async function (req, res) {
        let quantity_total = 0;
        let supplierName = null;

        try {
            const suppliers = await supplier.find();
            console.log(suppliers);
            try{
                const conferments = await conferment.find()
                let i = 0;
                let j = 0;
                while(i < suppliers.length) {
                    while (j < conferments.length) {
                        if(suppliers[i].username === conferments[j].supplier)
                            quantity_total+=conferments[j].quantity
                            supplierName=suppliers[i].username
                        j++;
                    }
                    const result = {supplierName,quantity_total}
                    console.log(result);
                    res.json(result);
                    quantity_total=0;
                    i++;
                }
            }catch(e){

            }
        } catch (err) {
            res.status(400).json({msg: "An error is occured during the calculation"});
        }



    }
];