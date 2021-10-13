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

// This is the way to start the server on heroku
app.listen(process.env.PORT || 8000, () => console.log("Server is running..."));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
//sequelize values
const { Sequelize, Model, DataTypes, BelongsToMany} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
//bcrypt values
const bcrypt = require('bcrypt');
const users = require("./models").users;
//pgp and db requirements
const pgp = require("pg-promise")();
const db = pgp("postgres://postgres@127.0.0.1:5432/products");

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
          users.create ({
            name : req.body.name,
            username : req.body.username,
            password : hash,
          })
        }
      })
    })
    res.redirect('/catalog.html')
});

//See all users in DB
app.get('/users', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const user = await users.findAll();
  console.log('Users in DB: ', user);
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
app.get("/users/:username", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let username = req.params["username"];
  const user = await users.findOne({
    
      where: { username: username },

  });
  res.status(200).send(JSON.stringify(user));
});
app.post("/login", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const username = req.body.username;
  const password = req.body.password;
  users.findOne({
    where: {
      username: username,
    },
  }).then((users) => {
    bcrypt.compare(password, users.password, function (err, isMatch) {
      if (err) {
        throw err;
      } else if (!isMatch) {
        res.json('401 - Unauthorized');
      } else {
        res.redirect('/catalog.html/')
      }
    });
  });
});

// update a user
app.put("/users/:name", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let newName = req.params["name"];
  console.log(newName);
  await users.update(
    {
      name: req.body.name,
      username: req.body.username
    },
    {
      where: {
        name: newName,
      },
    }
  ).catch(err =>console.log(err));
  res.status(200).send("User updated");
});

/*Routing for cat_info*/
app.all('*', (req, res, next) => {
  next();
});

app.get('bathbombs',(req,res) =>{
  const products = bathbombs.find();
  if(products){
      res.render('catalog',{
          locals : {
              bathbombs
          },
      });
  }
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
