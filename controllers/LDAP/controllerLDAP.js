const fs = require("fs");       //модуль работы с файлами
const PathConfigFile = "./config/config.json";
const PathConfigFile2 = "./config/LDAPDATA.json";
const LDAPsession = require("./controllerLDAPconnect.js");



showLDAPelements = function(request, response){                                       //showusers
    let jsonFile;
    let configData;
    let configExist = true;
  

    if (fs.existsSync(PathConfigFile)){                                               //если конфигурационный файл существует
      jsonFile = fs.readFileSync(PathConfigFile, "utf8");                             //read all files with config by JSON
      configData = JSON.parse(jsonFile);                                              //conver to JS format 
  
      if (configData.LDAP             == undefined) {configExist = false;} else       //Если нету данного ключа то нету LDAP описания//говорим что нет параметров для подключения
      if (configData.LDAP.IpAddress   == undefined) {configExist = false;} else                                              
      if (configData.LDAP.Login       == undefined) {configExist = false;} else   
      if (configData.LDAP.Password    == undefined) {configExist = false;} else   
      if (configData.LDAP.Filter      == undefined) {configExist = false;} else   
      if (configData.LDAP.Port        == undefined) {configExist = false;} else   
      if (configData.LDAP.Folder      == undefined) {configExist = false;}; 
      } else {configExist = false;}; 

      if(configExist == true){                                                          //если после проверки все ок и есть вся конфигурация от LDAP, то работаем дальше   
        queryCallback = function(client){
            let opts ={
                filter: configData.LDAP.Filter,                                               //указываем выборку каких объектов мы будем делать 
                scope: 'sub',           //указываем глубину где искать
                attributes: ["cn","ipPhone"]
              };
          
            client.search(configData.LDAP.Folder, opts, (err, res) => { 
                if(err){console.log(err)};    
                res.on('searchEntry', (entry) => {
                    console.log('entry: ' + JSON.stringify(entry.object));              
                    let jsonFile =JSON.stringify(entry.object);              
                    fs.writeFileSync(PathConfigFile2, jsonFile);
                });       
            });
        };
        LDAPsession(request, response, queryCallback);
        console.log('тут должен быть код');
        };       
        

        
    };

module.exports.showLDAPelements                   = showLDAPelements;