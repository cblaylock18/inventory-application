const { Router } = require("express");
const userController = require("../controllers/userController");
const asyncHandler = require("../helperFns/asyncHandler");
const checkAdmin = require("../helperFns/checkAdmin");

const userRouter = Router();

userRouter.get("/:id", asyncHandler(userController.userManagementGet));
userRouter.post("/:id", checkAdmin, userController.userManagementPost);
userRouter.post(
    "/deleteUser/:id",
    checkAdmin,
    asyncHandler(userController.userDeletePost)
);

module.exports = userRouter;
