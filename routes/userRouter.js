const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/:id", userController.userManagementGet);
userRouter.post("/:id", userController.userManagementPost);
userRouter.post("/deleteUser/:id", userController.userDeletePost);

module.exports = userRouter;
