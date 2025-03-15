const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/:id", categoryController.categoryManagementGet);
categoryRouter.post("/:id", categoryController.categoryManagementPost);
categoryRouter.post(
    "/deleteCategory/:id",
    categoryController.categoryDeletePost
);

module.exports = categoryRouter;
