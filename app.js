const express = require("express");             // подключение express
const app = express();                          // создаем объект приложения


app.set("view engine", "hbs");                  //указываем движок отображения
app.use(express.urlencoded({ extended: false }));   //для получения отпрвленных данных создаем парсер false - указывает результат набор пар ключ-значнеие

const userRouter = require("./routes/userRouter.js");
const homeRouter = require("./routes/homeRouter.js");
const routeMySQL = require("./routes/MySQL/routerMySQL.js");    //подклчем роуты для MySQL

app.use("/mysql",routeMySQL);  
app.use("/users", userRouter);          //use обозначает что тут будет применяться метод
app.use("/", homeRouter);
 
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});
 
app.listen(3000);

