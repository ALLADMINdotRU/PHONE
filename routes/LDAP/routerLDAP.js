const express = require("express");
const сontrollerLDAPconfig      = require("../../controllers/LDAP/controllerLDAPconfig.js");
const сontrollerLDAPconnect     = require("../../controllers/LDAP/controllerLDAPconnect.js");
const сontrollerLDAP            = require("../../controllers/LDAP/controllerLDAP.js");

const routerLDAP = express.Router(); //

routerLDAP.use("/config",                          сontrollerLDAPconfig.config);
routerLDAP.use("/saveconfig",                      сontrollerLDAPconfig.postLDAPconfigSave);

//routerLDAP.use("/connect",                         сontrollerLDAPconnect.authenticateDN);

routerLDAP.use("/showusers",                       сontrollerLDAP.showLDAPelements);


module.exports = routerLDAP;  //making our result available outside