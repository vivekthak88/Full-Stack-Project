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
const saltRounds = 10;
const myPassword = 'test@password1234'; //hard coded here but needs passed from reg/login form
const myPassword2 = 'faketestpassword@4321';

bcrypt.hash(myPassword, saltRounds, function(err, hash) {
    // Store hash in database here

    //logs hash
    console.log(hash);
});

//Test script to run locally
bcrypt.hash(myPassword, saltRounds, function(err, hash) { // Salt + Hash
    bcrypt.compare(myPassword2, hash, function(err, result) {  // Compare
      // if passwords match
      if (result) {
            console.log("It matches!")
      }
      // if passwords do not match
      else {
            console.log("Invalid password!");
      }
    });
  });
// actual place to compare hash vs password
// bcrypt.compare(myPassword, hash, function(err, result) {
//     // returns result
//   });


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });