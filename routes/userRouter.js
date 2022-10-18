const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router(); // определяем Router
 
// определяем маршруты и их обработчики внутри роутера userRouter
userRouter.use("/postuser", userController.postUser);
userRouter.use("/create", userController.addUser);
userRouter.use("/", userController.getUsers);
 
module.exports = userRouter; //делаем доступным наш результат снаружи