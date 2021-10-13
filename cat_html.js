const http = require('http');
const express = require('express');
const templateEngine = require('express-es6-template-engine')
const appserver = express();
appserver.engine('html',templateEngine);
appserver.set('views','templates');
appserver.set('view engine','html');
const hostname = "127.0.0.1";
const port = 3000;

const cats = [
    {
        "id":"abys",
        "name":"abysinian",
        "origin":"Egypt"
    },
    {
        "id":"abob",
        "name":"American Bobcat",
        "origin":"USA"
    },
    {
        "id":"cute",
        "name":"Cute Cat",
        "origin":"UK"
    }
    ,
    {
        "id":"badcat",
        "name":"bad Cat",
        "origin":"UK"
    }    
]

app.get('/cats/:cId',(req,res) =>{
    const catId = req.params['cId'];
    const catNeeded = cats.find( c => c.id === catId);
    if(catNeeded){
        res.render('cat_info',{
            locals : {
                catNeeded
            },
            partials : {
                header : 'partials/header',
                footer: 'partials/footer'
            }
        });
    }
});

app.get('/cats',(req,res) =>{
    res.render('catalog',{
        locals : {
            users
        },
        partials : {
            header : 'partials/header',
            footer: 'partials/footer'
        }        
    });
});

const server = http.createServer(appserver);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });