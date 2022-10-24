const express = require("express");
const userController = require("../controllers/userController.js");
const controllerUsers = require("../controllers/users/controllerUsers.js");
const userRouter = express.Router(); // определяем Router
 
// определяем маршруты и их обработчики внутри роутера userRouter
userRouter.use("/showusers", controllerUsers.postShowUsers);
userRouter.use("/postuser", userController.postUser);
userRouter.use("/create", userController.addUser);
userRouter.use("/", userController.getUsers);
 
module.exports = userRouter; //делаем доступным наш результат снаружи