connect = function(request, response){
    let varErrDB = false;   //указывает есть ли ошибка по имени БД
    let varDBname = "";     //имя БД
    let varErrLogin = false;
    let connection;

    if (fs.existsSync(PathConfigFile)){     //check exist file with config by MySQL
        //console.log("существует");
        jsonFile = fs.readFileSync(PathConfigFile, "utf8"); //read all files with config by JSON
        configData = JSON.parse(jsonFile);                  //conver to JS format 

        connection = mysql.createConnection({     //connect to MySQL
            host: configData.MySQL.IpAddress,
            user: configData.MySQL.Login,
            database: configData.MySQL.Database,
            password: configData.MySQL.Password
          }); 
    } else {        
        console.log("file not exist: " + PathConfigFile);      
    };
    
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
        else{   //если подключение к БД прошло успешно
            console.log("Connect to MySQL sever is succefull");
        }
    });  
};

module.exports = connect; //делаем доступным наш результат снаружи