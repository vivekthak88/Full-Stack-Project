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
const users = require("./models").users;

//register user
app.post("/register", async (req, res)=> {
  res.setHeader("Content-Type", "application/json");
    let hash;
    await bcrypt.genSalt(10, (err, salt)=> {
    hash = bcrypt.hash(req.body.password, salt, (err, hash)=> {
      if(!err){
        res.send("User Registered");
        console.log(hash);
        users.create ({
          name : req.body.name,
          username : req.body.username,
          password : hash,
          })
          console.log(users);
        }
    })
  })
  });


// app.post('/login', (req, res) => {

//   const username = req.body.username
//   const password = req.body.password
// //User is table name
//   users.findOne({
//       username: username
//   }).then((user) => {
//       bcrypt.compare(password, user.password, (error, result) => {
//           if (result) {
//               // whatever you want to happen if there is no error
//               res.send("User Added");
//           } else {
//               res.json({success: false});
//           }
//       })
//   })
// });


// Create router for login page
// var login = require('./login.js');
// app.use('/login', login);



server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });