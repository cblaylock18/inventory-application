const { Router } = require("express");
const productController = require("../controllers/productController");

const productRouter = Router();

productRouter.get("/:id", productController.productManagementGet);
productRouter.post("/:id", productController.productManagementPost);
productRouter.post("/deleteProduct/:id", productController.productDeletePost);

module.exports = productRouter;
