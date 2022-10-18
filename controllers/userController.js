const User = require("../models/user.js");  //подключаем класс user

exports.addUser = function(request, response){
    response.render("create.hbs");          //отправка ответа
};

exports.getUsers = function (request, response){
    response.render("users.hbs",{
        users: User.getAll()
    });
};

exports.postUser= function(request, response){   //сюда попадают данные из формы ввода данных о пользователе
    const username = request.body.name;
    const userage = request.body.age;
    const user = new User(username, userage);       //создаем объект user через класс User
    user.save();                                    //вызываем у объекта user метод save
    response.redirect("/users");
};
