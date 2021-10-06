//Import required libraries
const http = require('http');
const hostname = "127.0.0.1";
const port = 3000;
//express packages
const express = require('express'),
  es6Renderer = require('express-es6-template-engine'),
  app = express();
const server = http.createServer(app);
  
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');
app.use(express.static('templates'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
//sequelize values
const { Sequelize, Model, DataTypes, BelongsToMany} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
//bcrypt values
const bcrypt = require('bcrypt');
const users = require("./models").users;
//pgp and db requirements
// const pgp = require("pg-promise")();
// const db = pgp("postgres://Julia@127.0.0.1:5432/products");

app.get('/index',(req,res) =>{
  res.render('index');
});

//Route /bathbombs path to return all the bathbombs from the array
app.get("/bathbombs", (req, res) => {
  // Find bathbombs
  res.setHeader('Content-Type','application/json');
  db.any("SELECT * from bathbombs").then((bathbombs) => { 
      console.log(bathbombs);
      res.status(200).send(JSON.stringify(bathbombs));
      });
  });

//Get Products by Primary Key??
app.get('/bathbombs/:id', (req,res) => {
// The path parameter :id will be mapped to the value supplied in the url which can be retrieved via req.params
// For example : When http://localhost:3000/breeds/abys is called, the path parameter 'abys' will be mapped to the :id
  let bathbombId = req.params.id;
  console.log(req.params);
  db.any("SELECT * FROM bathbombs where id = $1", bathbombId).then((bathbombs) => {
    res.status(200).send(JSON.stringify(bathbombs)); 
  if(bathbombId){
    res.status(200).send(JSON.stringify(bathbombs));
  }else{
    res.status(404).send({ "error": "Product not found" });
  }
});
});

//register new user to DB
app.post("/register", async (req, res)=> {
  res.setHeader("Content-Type", "application/json");
  let hash;
    bcrypt.genSalt(10, (err, salt)=> {
      hash = bcrypt.hash(req.body.password, salt, (err, hash)=> {
        if(!err){
          console.log(hash);
          users.create ({
            name : req.body.name,
            username : req.body.username,
            password : hash,
          })
        }
      })
    })
    res.send("User " + req.body.username + " Added");
});
//See all users in DB
app.get('/users', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const user = await users.findAll();
  console.log('Users in DB: ', user);
  //console.log("All Users: ", JSON.stringify(users, null, 2));
  res.status(200).send(JSON.stringify(user));
})
// delete a user
app.delete("/users/:username", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let username = req.params["username"];
  const user = await users.destroy({
      where: { username: username },
  });
  res.status(200).send("User has been deleted!!");
});
// get one user
//This code may have to be used in some form for login
app.get("/users/:username", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let username = req.params["username"];
  const user = await users.findOne({
    
      where: { username: username },

  });
  res.status(200).send(JSON.stringify(user));
});
// update a user
//instead of :name, should be unique id/primary key
app.put("/users/:username", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let username = req.params["username"];
  const user = await users.update(
      { name: req.body.name },
      {
          where: {username: username},
      }
  );
  //user updated needs more info
  res.status(200).send(req.body.username + " name updated!!");
  //res.status(200).send(JSON.stringify(user));
});
// app.post('/login', (req, res) => {
//   res.setHeader("Content-Type", "application/json");

//   const username = req.body.username
//   const password = req.body.password
// //User is table name
//   users.findOne({
//       username: username
//   }).then((user) => {
//       bcrypt.compare(password, user.password, (error, result) => {
//           if (result) {
//               // whatever you want to happen if there is no error
//               res.send("User Logged In");
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

//Code To Add to Login/Register functions to redirect to catalog  
/*function validate(){
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
if ( username == "Formget" && password == "formget#123"){
alert ("Login successfully");
window.location = "/catalog.html"; // Redirecting to other page.
return false;
}*/