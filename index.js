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

//register new user to DB
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
  res.status(200).send(user);
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
  res.status(200).send("User name updated!!");
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