var express = require('express');
var bodyParser = require('body-parser');
var environment = require('./app/environment');
var passport = require('passport');
var app = express();
var cors = require('cors');
var session = require('express-session');
var path = require('path');

app.use(session({ secret: 'priti123', resave: true, saveUninitialized: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

// app.use(express.static(path.join(__dirname, '../ProjectDemo/src/assets/placeImages')));
app.use('/static', express.static(path.join(__dirname, 'uploads')));
app.use('/static1', express.static(path.join(__dirname, 'uploadsPlace')));
app.use('/room', express.static(path.join(__dirname, 'roomImages')));




app.use(function(req, res, next) {
    // console.log('header');
    res.header('Access-Control-Allow-Origin', "http://localhost:4200");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Expose-Headers',"content-type, cache,X-Custom-header, token");
    res.header("AccessControlAllowMethods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Origin,Access-Control-Expose-Headers, X-Requested-With, Content-Type, Accept,token");
    next();
});
//app.use(cors({credentials: true, origin: 'http://localhost:4200'}));


app.use(cors());

require('./app/config/passport')(passport);

require('./app/routes')(app, passport);



app.listen(environment.port, () => {
    console.log(environment.port);
});


