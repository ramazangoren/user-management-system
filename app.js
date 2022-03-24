const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 1000;

// parsing the middle ware 
// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended: false}));

// parsing aplication/json format
app.use(bodyParser.json());

// static files
app.use(express.static('public'));

// templating engine
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');



// connection POOL

const pool = mysql.createPool({
    connectionLimit  : 10000,
    host             : "localhost",
    user             : "root",
    password         : "password",
    database         : "database"
})

// CONNEC TO db
pool.getConnection((err, connection)=>{
     if(err) throw err;
     console.log('connected is ID' + connection.threadId);
});


// router
const routes = require('./server/routes/user');
app.use('/', routes)


app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))