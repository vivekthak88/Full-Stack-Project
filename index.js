//Import required libraries
const http = require('http');
const express = require('express'),
  es6Renderer = require('express-es6-template-engine'),
  app = express();
  
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');


const hostname = "127.0.0.1";
const port = 3000;
//express values
const server = http.createServer(app);
// var bodyParser = require('body-parser');
// app.use(bodyPcd arser.urlencoded({extended: false}));
//sequelize values
const { Sequelize, Model, DataTypes, BelongsToMany} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
//bcrypt values
const bcrypt = require('bcrypt-nodejs');
const users = require("./models/users.js")
const bathbombs = require("./models/bathbombs.js");

const pgp = require("pg-promise")();
const db = pgp("postgres://Julia@127.0.0.1:5432/products");

// //Array of Items
// const bathbombs = [
//   {
//     "id": 1,
//     "style": "Gingerbread with Bow",
//     "image": "./images/make-own.jpeg",
//     "description": "Paint Your Own Bath Bomb sets comes with everything you need! Get creative and make your own bath bomb in your image!",
//     "ingredients": "Baking soda, Citric Acid, Coconut Oil, Cocoa Butter, Epsom Salt, Polysorbate 80, Corn Starch, Isopropyl Alcohol, Fragrance, Red 40, Blue 1, Yellow 5, Mica",
//     "cost": 12.95,
//     "pinterest":"https://www.pinterest.com/pin-builder/?url=https%3A%2F%2Ffizzyfizzy.com%2Fproducts%2Fpaint-your-own-gingerbread&media=%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0029%2F8657%2F3935%2Fproducts%2F20210731_093018_1024x1024.jpg%3Fv%3D1627746415&description=Paint%20Your%20Own%20Bath%20Bomb&method=button"
//   },
//   {
//     "id": 2,
//     "style": "Peppermint Hot Cocoa",
//     "image": "./images/peppermint.jpeg",
//     "description": "Pop off the icing and hold under running water for a bath full of delicious moisturizing bubbles. Place bath bomb in the water in the same bath or separate",
//     "ingredients": "Baking soda, Citric Acid, Coconut Oil, Cocoa Butter, Epsom Salt, Sodium Lauryl Sulfacetate, Polysorbate 80, Cocamidopropyl Betaine, Cream of Tarter, Corn Starch, Isopropyl Alcohol, Fragrance, Red 40, Blue 1, Yellow 5, Mica, Biodegradable Glitter, Sodium Cocoyl Isethionate Noodles, Soap",
//     "cost": 12.95,
//     "pinterest":"https://www.pinterest.com/pin-builder/?url=https%3A%2F%2Ffizzyfizzy.com%2Fproducts%2Fpeppermint-hot-cocoa&media=%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0029%2F8657%2F3935%2Fproducts%2F20210731_093222_1024x1024.jpg%3Fv%3D1627746816&description=Peppermint%20Hot%20Cocoa&method=button"
//   },
//   {
//     "id": 3,
//     "style": "Snow Globe Bath Bomb",
//     "image": "./images/snow-globe.jpeg",
//     "description": "Listing is for 1 Snow Globe bath bomb. Hidden color inside. Bottom is a bath bomb, top is a bouncy ball",
//     "ingredients": null,
//     "cost": 12.95,
//     "pinterest": "https://www.pinterest.com/pin-builder/?url=https%3A%2F%2Ffizzyfizzy.com%2Fproducts%2Fsnow-globe&media=%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0029%2F8657%2F3935%2Fproducts%2F20210731_093119_1024x1024.jpg%3Fv%3D1627746898&description=Snow%20Globe%20Bath%20Bomb&method=button"
//   },
//   {
//     "id": 4,
//     "style": "Gingerbread Cupcake With Bubble Frosting",
//     "image": "./images/gingerbread.jpeg",
//     "description": "This 3 in 1 bath bomb is scented in Gingerbread. The top icing is a bubble bath and the gingerbread on top is soap. Pop off the icing and hold under running water for a bath full of delicious moisturizing bubbles. Drop the bottom of the cupcake in the same bath or a separate bath",
//     "ingredients": "Baking soda, Citric Acid, Coconut Oil, Cocoa Butter, Epsom Salt, Sodium Lauryl Sulfacetate, Polysorbate 80, Cocamidopropyl Betaine, Cream of Tarter, Corn Starch, Isopropyl Alcohol, Fragrance, Red 40, Blue 1, Yellow 5, Mica, Biodegradable Glitter, Sodium Cocoyl Isethionate Noodles, Soap",
//     "cost": 12.95,
//     "pinterest": "https://www.pinterest.com/pin-builder/?url=https%3A%2F%2Ffizzyfizzy.com%2Fproducts%2Fgingerbread-cupcake-with-bubble-frosting&media=%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0029%2F8657%2F3935%2Fproducts%2F20210731_100021_1024x1024.jpg%3Fv%3D1627746111&description=Gingerbread%20Cupcake%20With%20Bubble%20Frosting&method=button"
//   },
//   {
//     "id": 5,
//     "style": "Eggnog Body Frosting Scrub",
//     "image": "./images/eggnog.jpeg",
//     "description": "This 3 in 1 Sugar scrub leaves your skin feeling soft and silky. Simply place a small amount of scrub in your hands and massage into the area you would like exfoliated. Add water for a rich creamy lather. Exfoliate, cleanse, moisturize",
//     "ingredients": "Sugar, Sodium Cocoyl Isethionate Powder, Glycerin, Cocamidopropyl Betaine, Optiphen plus, Steric Acid, Tetrasodium EDTA, Mica",
//     "cost": 12.95,
//     "pinterest": "https://www.pinterest.com/pin-builder/?url=https%3A%2F%2Ffizzyfizzy.com%2Fproducts%2Fegg-nog-body-frosting-scrub&media=%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0029%2F8657%2F3935%2Fproducts%2F20210731_022922_1024x1024.jpg%3Fv%3D1627744948&description=Eggnog%20Body%20Frosting%20Scrub&method=button"
//   },
//   {
//     "id": 6,
//     "style": "Hot Cocoa Body Frosting Scrub",
//     "image": "./images/hot-cocoa.jpeg", 
//     "description": "This 3 in 1 Sugar scrub leaves your skin feeling soft and silky. Simply place a small amount of scrub in your hands and massage into the area you would like exfoliated. Add water for a rich creamy lather. Exfoliate, cleanse, moisturize",
//     "ingredients": "Sugar, Sodium Cocoyl Isethionate Powder, Glycerin, Cocamidopropyl Betaine, Optiphen plus, Steric Acid, Tetrasodium EDTA, Mica",
//     "cost": 12.95,
//     "pinterest": "https://www.pinterest.com/pin-builder/?url=https%3A%2F%2Ffizzyfizzy.com%2Fproducts%2Fhot-cocoa-body-frosting-scrub&media=%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0029%2F8657%2F3935%2Fproducts%2F20210731_001218_1024x1024.jpg%3Fv%3D1627744925&description=Hot%20Cocoa%20Body%20Frosting%20Scrub&method=button",
//   }
// ];

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
  console.table(req.params);
  db.any("SELECT * FROM bathbombs where id = $1", bathbombId).then((bathbombs) => {
    // res.status(200).send(JSON.stringify(bathbombs)); 
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
    await bcrypt.genSalt(10, (err, salt)=> {
      hash = bcrypt.hash(req.body.password, salt, (err, hash)=> {
        if(!err){
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