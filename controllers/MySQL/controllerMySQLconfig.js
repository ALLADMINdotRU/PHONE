const fs = require("fs");       //модуль работы с файлами
const PathConfigFile = "./config/config.json";
const MySQLsession = require("./controllerMySQLconnect.js");

exports.config = function(request, response){
    response.render("./MySQL/viewMySQLconfigConnect.hbs");          //отправка ответа
};

exports.postMySQLconfigSave = function(request, response) {
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


exports.createdb = function(request, response){
    queryCallback = function(connection) {   //запрос в калбэк
        let sql = "CREATE DATABASE " + request.body.DatabaseMySQL +";";        //тут содержится sql запрос создаем БД
        console.log(request.body.DatabaseMySQL);
        console.log(sql);
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
    MySQLsession(request, response, queryCallback, false) ;
}
