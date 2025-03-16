const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const asyncHandler = require("../helperFns/asyncHandler");
const checkAdmin = require("../helperFns/checkAdmin");

const categoryRouter = Router();

categoryRouter.get(
    "/:id",
    asyncHandler(categoryController.categoryManagementGet)
);
categoryRouter.post(
    "/:id",
    checkAdmin,
    categoryController.categoryManagementPost
);
categoryRouter.post(
    "/deleteCategory/:id",
    checkAdmin,
    asyncHandler(categoryController.categoryDeletePost)
);

module.exports = categoryRouter;
