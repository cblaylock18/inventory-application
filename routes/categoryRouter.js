const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const asyncHandler = require("../helperFns/asyncHandler");

const categoryRouter = Router();

categoryRouter.get(
    "/:id",
    asyncHandler(categoryController.categoryManagementGet)
);
categoryRouter.post("/:id", categoryController.categoryManagementPost);
categoryRouter.post(
    "/deleteCategory/:id",
    asyncHandler(categoryController.categoryDeletePost)
);

module.exports = categoryRouter;
