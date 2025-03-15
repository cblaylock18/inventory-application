const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");
const asyncHandler = require("../helperFns/asyncHandler");

const inventoryRouter = Router();

inventoryRouter.get("/", asyncHandler(inventoryController.inventoryAllGet));
inventoryRouter.get(
    "/category/:id",
    asyncHandler(inventoryController.inventoryCategoryGet)
);
inventoryRouter.get(
    "/user/:id",
    asyncHandler(inventoryController.inventoryUserGet)
);
inventoryRouter.get(
    "/allUsers",
    asyncHandler(inventoryController.inventoryAllUsersGet)
);
inventoryRouter.get(
    "/allCategories",
    asyncHandler(inventoryController.inventoryAllCategoriesGet)
);
inventoryRouter.get(
    "/user/view/:id",
    asyncHandler(inventoryController.inventoryOneUserGet)
);
inventoryRouter.get(
    "/category/view/:id",
    asyncHandler(inventoryController.inventoryOneCategoryGet)
);
inventoryRouter.get(
    "/product/view/:id",
    asyncHandler(inventoryController.inventoryOneProductGet)
);

module.exports = inventoryRouter;
