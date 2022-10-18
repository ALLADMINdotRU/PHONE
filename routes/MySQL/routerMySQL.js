const express = require("express");
const сontrollerMySQL = require("../../controllers/MySQL/controllerMySQL.js");
const сontrollerMySQLconfig = require("../../controllers/MySQL/controllerMySQLconfig.js");
const routerMySQL = express.Router(); // определяем Router

// определяем маршруты и их обработчики внутри роутера homeRouter
//routerMySQL.get("/create", сontrollerMySQL.about);
//routerMySQL.get("/config", сontrollerMySQL.index);
routerMySQL.get("/error",                           сontrollerMySQL.error);
routerMySQL.get("/connect",                         сontrollerMySQL.connect);
routerMySQL.get("/test",                            сontrollerMySQL.test);

routerMySQL.get("/config",                          сontrollerMySQLconfig.config);
routerMySQL.get("/postMySQLconfigsave",              сontrollerMySQLconfig.postMySQLconfigsave);

module.exports = routerMySQL;  //делаем доступным наш результат снаружи