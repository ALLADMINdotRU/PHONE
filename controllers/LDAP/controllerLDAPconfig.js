const fs = require("fs");       //модуль работы с файлами
const PathConfigFile = "./config/config.json";

config = function(request, response){                               //config
    response.render("./LDAP/viewLDAPconfigConnect.hbs");            //отправка ответа
};

postLDAPconfigSave = function(request, response) {                  //saveconfig
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

    if (configData.LDAP == undefined) {    //check exist key MySQL in file if not exist then create new key
        configData.LDAP={};
        console.log("not MySQL config");
    };    
    
    configData.LDAP.IpAddress =     request.body.IPaddressLDAP;
    configData.LDAP.Login =         request.body.LoginLDAP;
    configData.LDAP.Password =      request.body.PasswordLDAP;    
    configData.LDAP.Filter =        request.body.FilterLDAP;
    configData.LDAP.Port =          request.body.PortLDAP;
    configData.LDAP.Folder =        request.body.FolderLDAP;

    jsonFile =JSON.stringify(configData);

    fs.writeFileSync(PathConfigFile, jsonFile);

    let queryCallback=function(connection) { //проверяем удачно ли соединение
        connection.connect((err) => {
           if(err){} else {
            response.send("About the site");
           } 
        });
    }

    //MySQLsession(request, response, queryCallback, true) ;

    console.log("Here was the code");
    //response.send("About the site");
};

module.exports.postLDAPconfigSave       = postLDAPconfigSave
module.exports.config                   = config;