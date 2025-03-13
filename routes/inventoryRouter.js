const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");

const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.inventoryAllGet);
inventoryRouter.get("/category/:id", inventoryController.inventoryCategoryGet);
inventoryRouter.get(
    "/categoryManagement/:id",
    inventoryController.categoryManagementGet
);
inventoryRouter.post(
    "/categoryManagement/:id",
    inventoryController.categoryManagementPost
);
inventoryRouter.post(
    "/deleteCategory/:id",
    inventoryController.categoryDeletePost
);
inventoryRouter.get("/user/:id", inventoryController.inventoryUserGet);
inventoryRouter.get(
    "/userManagement/:id",
    inventoryController.userManagementGet
);
inventoryRouter.post(
    "/userManagement/:id",
    inventoryController.userManagementPost
);
inventoryRouter.post("/deleteuser/:id", inventoryController.userDeletePost);

module.exports = inventoryRouter;
