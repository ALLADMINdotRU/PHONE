//const { query } = require("express");
const MySQLsession = require("./controllerMySQLconnect.js");


exports.error = function(request, response){
    response.render("./MySQL/viewMySQLerr.hbs");          //отправка ответа
    //console.log(err.message);
};

exports.connect = function(request, response){ //подключаемся к БД

};

exports.test = function(){
    console.log("sdfasdfads");
}
