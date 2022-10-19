const fs = require("fs");       //модуль работы с файлами

exports.config = function(request, response){
    response.render("./MySQL/viewMySQLconfig.hbs");          //отправка ответа
};

exports.postMySQLconfigSave = function(request, response){
    fs.writeFileSync("./config/MySQLconfig.txt", "Hello world") ;      //

    console.log("Here was the code");
    response.send("About the site");
};