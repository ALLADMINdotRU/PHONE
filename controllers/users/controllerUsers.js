const MySQLsession = require("../MySQL/controllerMySQLconnect.js");

exports.postShowUsers = function(request, response){ //подключаемся к БД
    queryCallback = function(connection) {   //запрос в калбэк
        let sql = "SELECT * FROM users";        //тут содержится sql запрос
        connection.query(sql, function(err, results) {      //делаем уже запрос и получаем ответ результат отправляем в прорисовку
            if(err){
                return console.log(err);
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