const mysql = require("mysql2");

exports.error = function(request, response){
    response.render("./MySQL/viewMySQL.hbs");          //отправка ответа
    //console.log(err.message);
};

exports.connect = function(request, response){
    let varErrDB = false;   //указывает есть ли ошибка по имени БД
    let varDBname = "";     //имя БД
    let varErrLogin = false;

    const connection = mysql.createConnection({     //строка подключения к БД
        host: "localhost",
        user: "testuser",
        database: "phone_db",
        password: "12345678"
      });

    connection.connect(function(err){
        if (err) {        
            //return console.error("Ошибка: " + err.message +" "+ connection.config.database+" "+err.code);
            //response.send({name: "Vasya", foto: "photo.jpeg", city: "Nsk"});
            //let param = JSON.stringify({name: "ALexander", array: [1,2,3], obj: { a: 1, b: 2}});
            //response.redirect(`/mysql/error?msg=${param}` );
            if(err.code == "ER_BAD_DB_ERROR"){ //если ошибка что не существует БД                
                console.log("Error: connect to DB - not correct DataBase name");    //выводим в консоль сообщение что не верное имя БД 
                varErrDB = true;    //указываем что проблема в базе данных        
                varDBname = connection.config.database;  //имя базы данных       
                //response.redirect("/mysql/error" );                                  //отправляем на страницу с описанием ошибки
            };
            if(err.code == "ER_ACCESS_DENIED_ERROR"){
                console.log("Error: connect to DB - not correct Login or Passwordme");
                varErrLogin = true; //указываем что не верный логин или пароль
            }

        response.render("./MySQL/viewMySQLerr.hbs",{  //отправляем пользователю страницу с описание ошибки почему мы не можем подключиться к БД
            errDB:      varErrDB,
            errLogin:   varErrLogin,

            DBname: varDBname
        });  
        
        console.log(err.message);
        console.log(err.code);
        }
        else{
            console.log("Connect to MySQL sever is succefull");

        }
    });  
};

exports.test = function(){
    console.log("sdfasdfads");
}

