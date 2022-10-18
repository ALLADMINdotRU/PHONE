const fs = require("fs");       //модуль работы с файлами

exports.config = function(request, response){
    response.render("./MySQL/viewMySQLconfig.hbs");          //отправка ответа
};

exports.postMySQLconfigSave = function(request, response){
    fs.writeFileSync("./config/MySQLconfig.txt", "Привет ми ми ми!") ;      //

    console.log("Тут был код");
    response.send("О сайте");
};