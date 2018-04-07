var  main = require('./controllers/main');
var user = require('./controllers/user');
var place = require('./controllers/places');
var auth = require('./middleware/auth');
var multer = require('multer');
// var express = require('express');
// var app1 = express();
//
// app1.use(express.static(path.join(__dirname, '../../ProjectDemo/src/assets/placeImages')));


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../ProjectDemo/src/assets/placeImages')
    },
    filename: function (req, file, cb) {
        cb(null, 'img'+Date.now()+file.originalname);
    }
});
var upload = multer({ storage: storage });


module.exports = (app, passport)=>{
    app.get('/', main.hello);

    app.post('/login' , passport.authenticate('signIn',{
        failureRedirect:'/fail'
    }),(req,res)=>{
        console.log('sucess user ');
        console.log(req.session.passport.user.token)
        res.header('token', req.session.passport.user.token).send(req.session.passport.user);
    });
    app.get('/fail',(req,res)=>{
        console.log("in fail");
        res.send({"error":"failed"});
    });
    app.post('/signUp' , passport.authenticate('signUp',{
        failureRedirect:'/fail'
    }),(req,res)=>{
        console.log('sucess user ');
        console.log(req.session.passport.user.token);
        res.header('token', req.session.passport.user.token).send( req.session.passport.user);
    });

    app.post("/addImg",auth, upload.array("uploads[]", 12), place.addImage);
    app.post('/addPlace', auth, place.addPlace);
    app.get('/display',auth, place.displayPlace);
    app.get('/displayImg',auth, place.displayImage);
    app.get('/deletePlace',auth, place.deletePlace);
    app.get('/check', user.checkToken);
    app.get('/page', auth, place.serverPage);
    app.get('/totalRecord', auth, place.totalRecord);
    app.get('/displayUser', auth, user.displayUserData);
    app.delete('/deleteUser', auth, user.deleteUser);

    app.get('/hello', auth ,user.hello);
};


