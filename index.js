//local server initiation
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;
//express values
const express = require("express");
const app = express();
app.use(express.json());
const server = http.createServer(app);
//sequelize values
const { Sequelize, Model, DataTypes } = require('sequelize');
//const sequelize = new Sequelize('sqlite::memory:');
//bcrypt values
const bcrypt = require('bcrypt');

//register user
app.post("/register", (req, res)=> {
  const username = req.body.username;
  const password = req.body.password;
  bcrypt.genSalt(10, (err, salt)=> {
    bcrypt.hash(password, salt, (err, hash)=> {
      if(!err){
        res.send("User Registered");
        console.log(username, hash);
      }
    })
  })
});

app.post('/login', (req, res) => {

  const username = req.body.username
  const password = req.body.password
//User is table name
  User.findOne({
      username: username
  }).then((user) => {
      bcrypt.compare(password, user.password, (error, result) => {
          if (result) {
              // whatever you want to happen if there is no error
              res.send("User Added");
          } else {
              res.json({success: false});
          }
      })
  })
});


// Create router for login page
// var login = require('./login.js');
// app.use('/login', login);



server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });