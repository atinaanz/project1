const express       = require('express');
const app           = express();
const path          = require('path');
const mysql         = require('mysql');
const session       = require('express-session');
const MySQLStore    = require('express-mysql-session')(session);
const Router         = require('./Router');
const { createConnection } = require('net');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

//console.log('Testing server');

//<!--DATABASE-->
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'rootqwer',
    database: 'myapp',
    //insecureAuth: true
});

//---------------------------------------------------------------------------------

//createConnection.query('SELECT * FROM users', function(err,rows,fields){
//   if (err) throw err;
//})

//---------------------------------------------------------------------------------
db.connect(function(err){
   if (err){
        console.log('DB error');
        throw err;
        //return false;
    }
    console.log('connected!');
});

//---------------------------------------------------------------------------------

const sessionStore = new MySQLStore({
    expiration: (1825 * 84400 *1000),
    endConnectionOnClose: false
}, db);

app.use(session({
    key: '328hJmLd72',
    secret: 'sdgDuYheg63g',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 84400 *1000),
        httpOnly: false
    }
}));

new Router(app,db);

app.get('/',function(req, res){
    res.sendFile(path.join(__dirname,'build','index.html'));
});

app.listen(3000); 