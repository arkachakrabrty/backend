const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const con =  mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"newdatabase"
});

app.get('/', function(req,res){
    res.sendFile(__dirname + "/" + "demo.html");
})

app.post('/addUser',(req,res)=>{
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var regNumber = req.body.regNumber;
    // INSERT INTO table name(column1, column2, column3) VALUES(value1, value2.....)
    var query = 'INSERT INTO userinfo (firstName, lastName, regNumber) VALUES ( " '+firstName+' ", "'+lastName+'", "'+regNumber+'")';

    con.query(query,(err,results)=>{
        if(err){
            //console.log(err);
            console.log(err.sql);
            console.log(err.message);
            res.send(err.message);
        }
        else{
            console.log("Data is entered");
            res.send({
                status:200,
                message:"Data is entered."
            });
        };
    });

});

app.post("/updateUser", (req, res) => {
    
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let regNumber = req.body.regNumber;
    let newFirstName = req.body.newFirstName;
    let newLastName = req.body.newLastName;
    let newRegNumber = req.body.newRegNumber;
    let query = `UPDATE USERINFO SET firstName = "${newFirstName}" , lastName = "${newLastName}" , regNumber = ${newRegNumber} WHERE firstName = "${firstName}" AND lastName = "${lastName}" AND regNumber = ${regNumber} `;
    con.query(query, (err, results) => {
      if (err) {
        res.send(err.message);
        console.log(err.sql);
        console.log(err.message);
      } else {
        console.log("Data is updated.");
        res.send({
          status: 200,
          message: "Data is updated.",
        });
      }
    });
  });

  app.post("/deleteUser", (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let regNumber = req.body.regNumber;
    let query = `DELETE FROM USERINFO WHERE firstName = "${firstName}" AND lastName = "${lastName}" AND regNumber = ${regNumber} `;
    
    con.query(query, (err, results) => {
      if (err) {
        res.send(err.message);
        console.log(err.message);
      } 
      else {
        console.log("Data has been deleted.");
        res.send({
          status: 200,
          message: "Data is deleted.",
        });
      }

    });

  });

const PORT = 6001;
app.listen(PORT,()=>{
    console.log('Serving running at ${PORT} ');
})