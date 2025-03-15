const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");

const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.inventoryAllGet);
inventoryRouter.get("/category/:id", inventoryController.inventoryCategoryGet);
inventoryRouter.get("/user/:id", inventoryController.inventoryUserGet);

module.exports = inventoryRouter;
