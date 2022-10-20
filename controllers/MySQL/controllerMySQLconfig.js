const fs = require("fs");       //модуль работы с файлами
const PathConfigFile = "./config/config.json";

exports.config = function(request, response){
    response.render("./MySQL/viewMySQLconfig.hbs");          //отправка ответа
};

exports.postMySQLconfigSave = function(request, response){
    
   // const config = ini.parse(fs.readFileSync(PathConfigFile, "utf-8"));

 /*   request.body.IPaddressMySQL; 
    request.body.LoginMySQL;
    request.body.LoginMySQL;
    fs.writeFileSync(PathConfigFile, "Hello world") ;     */ //

    //const config = ini.parse(fs.readFileSync('./config.ini', "utf-8"));
    //const config = fs.readFileSync('./config.ini', "utf-8");
    //config.scope = 'local';
    //config.scope3 = 'local';
    //config.database.database = 'use_another_database';

    //fs.writeFileSync('./config_modified.ini', ini.stringify(config, { section: 'section' }));
   // let text = fs.readFileSync('./config.ini');


   fs.access(PathConfigFile, function(error){
    let jsonFile;
    let configData;

        if (error){
            console.log("file not exist: " + PathConfigFile);       
            jsonFile =JSON.stringify("");
            fs.writeFileSync(PathConfigFile, jsonFile);
        };

        jsonFile = fs.readFileSync(PathConfigFile, "utf8"); //read all files with config by JSON
        configData = JSON.parse(jsonFile);                  //conver to JS format

        if (configData.MySQL == undefined) {    //check exist key MySQL in file if not exist then create new key
            configData.MySQL={};
            console.log("not mysql");
        };
        if (configData.MySQL.IpAddress == undefined) {    //check exist key IpAddress in file if not exist then create new key
            configData.MySQL={IpAddress:""};
            console.log("not IpAddress");
        };
        if (configData.MySQL.Login == undefined) {    //check exist key Login in file if not exist then create new key
            configData.MySQL={Login:""};
        };
        if (configData.MySQL.Password == undefined) {    //check exist key Password in file if not exist then create new key
            configData.MySQL={Password:""};
        };
        
        configData.IpAddress = request.body.IPaddressMySQL;
        configData.Login = request.body.LoginMySQL;
        configData.Password = request.body.PasswordMySQL;      

        jsonFile =JSON.stringify(configData);

        fs.writeFileSync(PathConfigFile, jsonFile);


          /*  if('IpAddress' in configData ) {        //проверяем существование поля в файле
                
            } else {

            }*/
        
   })
    
/*
   let MySQL = {
    IpAddress: "127.0.0.1",
    Login: "testuser",
    Password: "12345678"
   };


   fs.open(PathConfigFile)

    let obj = new Object();
    obj.name ="FIL";
    obj.age =35;
    obj.married = false;

    var jsonConfig =JSON.stringify(obj);

    fs.writeFileSync(PathConfigFile, jsonConfig);
*/


   // console.log(configIni);
    console.log("Here was the code");
    response.send("About the site");
};

