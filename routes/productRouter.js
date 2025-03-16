const { Router } = require("express");
const productController = require("../controllers/productController");
const asyncHandler = require("../helperFns/asyncHandler");
const checkAdmin = require("../helperFns/checkAdmin");

const productRouter = Router();

productRouter.get("/:id", asyncHandler(productController.productManagementGet));
productRouter.post("/:id", productController.productManagementPost);
productRouter.post(
    "/deleteProduct/:id",
    checkAdmin,
    asyncHandler(productController.productDeletePost)
);

module.exports = productRouter;
