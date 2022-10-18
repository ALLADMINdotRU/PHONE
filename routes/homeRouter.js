const express = require("express");
const homeController = require("../controllers/homeController.js");
const homeRouter = express.Router(); // определяем Router

// определяем маршруты и их обработчики внутри роутера homeRouter
homeRouter.get("/about", homeController.about);
homeRouter.get("/", homeController.index);

module.exports = homeRouter;  //делаем доступным наш результат снаружи