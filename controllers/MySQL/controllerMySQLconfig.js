const fs = require("fs");       //модуль работы с файлами
const PathConfigFile = "./config/config.json";

exports.config = function(request, response){
    response.render("./MySQL/viewMySQLconfig.hbs");          //отправка ответа
};

exports.postMySQLconfigSave = function(request, response) {
    let jsonFile;
    let jsonFile2;
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

    jsonFile =JSON.stringify(configData);

    fs.writeFileSync(PathConfigFile, jsonFile);
    console.log("Here was the code");
    response.send("About the site");
};

