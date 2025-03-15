const { Router } = require("express");
const userController = require("../controllers/userController");
const asyncHandler = require("../helperFns/asyncHandler");

const userRouter = Router();

userRouter.get("/:id", asyncHandler(userController.userManagementGet));
userRouter.post("/:id", userController.userManagementPost);
userRouter.post("/deleteUser/:id", asyncHandler(userController.userDeletePost));

module.exports = userRouter;
