const ldap = require('ldapjs');
const PathConfigFile = "./config/config.json";
const fs = require("fs");       //модуль работы с файлами
const server = ldap.createServer();



authenticateDN = function(request, response, queryCallback){                         //connect ROUTE
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
    } else {configExist = false;};                                                  //если файл с конфигурации не найден то нету и конфигруации
 

  if(configExist == true){                                                          //если после проверки все ок и есть вся конфигурация от LDAP, то работаем дальше

    var client = ldap.createClient({
      url:'ldap://'+ configData.LDAP.IpAddress + ':' + configData.LDAP.Port                   //указываем адрес ldap сервера 'ldap://172.16.0.10:389'
    });

    client.bind(configData.LDAP.Login, configData.LDAP.Password, function(err){     //связываем логин и пароль с сервером
      if(err){
        console.log("error LDAP connection "+ err)
      }else{
        console.log("success LDAP connection");
        if (queryCallback !== undefined) {queryCallback(client)};                   //если калбэк не пустой то возращаем результат
      }
    });
  }else {response.send("Нету конфигурационных данных LDAP")};                       //если не было норм конфиграции LDAP то выводим сообщение
};


/*
    client.search('OU=Services,OU=Users,OU=Accounts,DC=rb,DC=local', opts, (err, res) => {
        if(err){console.log(err)};
      
        res.on('searchRequest', (searchRequest) => {
          console.log('searchRequest: ', searchRequest.messageID);
        });
        res.on('searchEntry', (entry) => {
          console.log('entry: ' + JSON.stringify(entry.object));

          let jsonFile =JSON.stringify(entry.object);

          fs.writeFileSync(PathConfigFile2, jsonFile);
        });
       /* res.on('searchReference', (referral) => {
          console.log('referral: ' + referral.uris.join());
        });
        res.on('error', (err) => {
          console.error('error: ' + err.message);
        });
        res.on('end', (result) => {
          console.log('status: ' + result.status);
        });
        console.log(res);


    });

}*/


/*getUsers = function(){

}*/

module.exports                   = authenticateDN;
