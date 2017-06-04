var express   =    require("express");
var mysql     =    require('mysql');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var app       =    express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sequelize = new Sequelize('reminders', 'root', 'Ikr21031994', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});

var x = sequelize.authenticate();

const Reminder = sequelize.define('reminder', {
    Name: {
        type: Sequelize.STRING
    },
    Date: {
        type: Sequelize.DATE
    },
    isComplete: {
        type: Sequelize.BOOLEAN
    }
});

//Resources

// GET
app.get("/reminders/",function(req,res){
    Reminder.findAll().then(function(data){
        res.status(200).json(data);
    });
});

app.get("/reminders/:id",function(req,res){
    Reminder.findAll({where:{id:req.params.id}}).then(function(data){
        res.status(200).json(data);
    });
});

//POST
app.post("/reminders/",function(req,res){
    Reminder.create(req.body).then(function(data){
        res.status(201).json(data);
    });
});

//PUT
app.put("/reminders/:id",function(req,res){
    Reminder.update(req.body,{where:{id:req.params.id}}).then(function(data){
        res.status(204).send();
    });
});

//DELETE
app.delete("/reminders/:id",function(req,res){
    Reminder.destroy({where:{id:req.params.id}}).then(function(){
        res.status(200).send();
    });
});


// Others

app.get("*", function(req, res){
    res.json({"code" : 100, "status" : "Invalid resource"});
});


app.listen(3000);
