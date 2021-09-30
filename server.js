//Server Setup - Requires Express, ES6 Template Engine
const http = require("http");
const express = require("express");
const templateEngine = require('express-es6-template-engine');
const appserver = express();
appserver.engine = ('html', templateEngine);
appserver.set('views', 'templates');
appserver.set('view engine', 'html');
const hostname = "127.0.0.1";
const port = 3000;

//Get All Products w/ Template Engine
//May need to adjust variable names to match Items DB
appserver.get('/products/pId', (req, res) => {
    const pId = req.params['pId'];
    res.setHeader('Content-type', 'text/html');
    const productNeeded = products.find(c => c.id === pId);
    console.log(productNeeded);
    if(productNeeded) {
        res.render('product_info', {
            locals: {
                productNeeded
            }
        })
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });