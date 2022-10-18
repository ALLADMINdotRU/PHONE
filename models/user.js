const users = [];       //создаем массив
 
module.exports= class User{     //создаем класс-модель ПОЛЬЗОВАТЕЛЬ
 
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    save(){
        users.push(this);
    }
    static getAll(){
        return users;
    }
}