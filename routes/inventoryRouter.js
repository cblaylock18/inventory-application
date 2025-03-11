const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");

const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.inventoryAllGet);

module.exports = inventoryRouter;
