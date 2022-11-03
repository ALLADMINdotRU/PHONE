const fs = require("fs");       //модуль работы с файлами
const PathConfigFile = "./config/config.json";
const MySQLsession = require("./controllerMySQLconnect.js");

config = function(request, response){
    response.render("./MySQL/viewMySQLconfigConnect.hbs");          //отправка ответа
};

postMySQLconfigSave = function(request, response) {
    let jsonFile;
    let configData;    

    if (fs.existsSync(PathConfigFile)){
        //console.log("существует"); 
    } else {        
        console.log("file not exist: " + PathConfigFile);
        jsonFile =JSON.stringify({});   //create JSON
        fs.writeFileSync(PathConfigFile, jsonFile);       
    };

    jsonFile = fs.readFileSync(PathConfigFile, "utf8"); //read all files with config by JSON
    configData = JSON.parse(jsonFile);                  //conver to JS format

    if (configData.MySQL == undefined) {    //check exist key MySQL in file if not exist then create new key
        configData.MySQL={};
        console.log("not MySQL config");
    };    
    
    configData.MySQL.IpAddress =    request.body.IPaddressMySQL;
    configData.MySQL.Login =        request.body.LoginMySQL;
    configData.MySQL.Password =     request.body.PasswordMySQL;    
    configData.MySQL.Database =     request.body.DatabaseMySQL;
    configData.MySQL.Port =         request.body.PortMySQL;

    jsonFile =JSON.stringify(configData);

    fs.writeFileSync(PathConfigFile, jsonFile);

    let queryCallback=function(connection) { //проверяем удачно ли соединение
        connection.connect((err) => {
           if(err){} else {
            response.send("About the site");
           } 
        });
    }

    MySQLsession(request, response, queryCallback, true) ;

    console.log("Here was the code");
    //response.send("About the site");
};




createdb = function(request, response){
    queryCallback = function(connection) {   //запрос в калбэк
        let sql = "CREATE DATABASE " + request.body.DatabaseMySQL +";";        //тут содержится sql запрос создаем БД
        connection.query(sql, function(err, results) {      //делаем уже запрос и получаем ответ результат отправляем в прорисовку
            if(err){
                return console.log(err);        //если во время исполнения sql запроса возникла ошибка, выводим ее в консоль
            } else {                                //если запрос выполнился хорошо . то делаем следующее действие
                createtables(request, response);
            };
        });

        connection.end(function(err) {
            if (err) {
            return console.log("Error closing MySQL session: " + err.message);
            }
            console.log("MySQL session is closse");
        });  
    
    };
    MySQLsession(request, response, queryCallback, false) ;
};


createtables = function(request, response){
    queryCallback = function(connection) {   //запрос в калбэк
        let sql = 
        "CREATE TABLE users ( "+
            "ID INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT, "+
            "objectguid VARCHAR(50) NOT NULL DEFAULT '', "+
            "fio VARCHAR(150) NOT NULL DEFAULT '', "+
            "email VARCHAR(50) NOT NULL DEFAULT '' , "+
            "phone VARCHAR(50) NOT NULL DEFAULT '' , "+
            "mobile VARCHAR(50) NOT NULL DEFAULT '' , "+
            "position VARCHAR(50) NOT NULL DEFAULT '' , "+
            "department VARCHAR(50) NOT NULL DEFAULT '' , "+
            "room VARCHAR(5) NOT NULL DEFAULT '' );"//тут содержится sql запрос создаем БД

        connection.query(sql, function(err, results) {      //делаем уже запрос и получаем ответ результат отправляем в прорисовку
            if(err){
                return console.log(err);        //если во время исполнения sql запроса возникла ошибка, выводим ее в консоль
            } else {
                response.render("index.hbs", {
                    users: results
                });
            };
        });

    connection.end(function(err) {
        if (err) {
          return console.log("Error closing MySQL session: " + err.message);
        }
        console.log("MySQL session is closse");
      });  
    
    };
    MySQLsession(request, response, queryCallback, true) ;
};

module.exports.createdb                 = createdb;
module.exports.createtables             = createtables;
module.exports.postMySQLconfigSave      = postMySQLconfigSave
module.exports.config                   = config;