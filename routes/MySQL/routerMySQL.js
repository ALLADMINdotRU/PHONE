const express = require("express");
const сontrollerMySQL = require("../../controllers/MySQL/controllerMySQL.js");
const сontrollerMySQLconfig = require("../../controllers/MySQL/controllerMySQLconfig.js");
const routerMySQL = express.Router(); //

// define routes and their handlers inside the router 
routerMySQL.use("/error",                           сontrollerMySQL.error);
routerMySQL.use("/connect",                         сontrollerMySQL.connect);
routerMySQL.use("/test",                            сontrollerMySQL.test);

routerMySQL.use("/config",                          сontrollerMySQLconfig.config);
routerMySQL.use("/saveconfig",                      сontrollerMySQLconfig.postMySQLconfigSave);
routerMySQL.use("/createdb",                        сontrollerMySQLconfig.createdb);

module.exports = routerMySQL;  //making our result available outside