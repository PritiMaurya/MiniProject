var  main = require('./controllers/main');
var user = require('./controllers/user');
var place = require('./controllers/places');
var hotel = require('./controllers/hotels');
var auth = require('./middleware/auth');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploadsPlace/')
    },
    filename: function (req, file, cb) {
        cb(null, 'img'+Date.now()+file.originalname);
    }
});
var upload = multer({ storage: storage });


var storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, 'img'+Date.now()+file.originalname);
    }
});
var uploadImg = multer({ storage: storage1 });


var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./roomImages/")
    },
    filename: function (req, file, cb) {
        cb(null, 'img'+Date.now()+file.originalname);
    }
});
var uploadRoom = multer({ storage: storage2 });

module.exports = (app, passport)=>{
    app.get('/', main.hello);

    app.post('/login' , passport.authenticate('signIn',{
        failureRedirect:'/fail'
    }),(req,res)=>{
        console.log('success user ');
        // console.log(req.session.passport.user.token)
        res.header('token', req.session.passport.user.token).send(req.session.passport.user);
    });
    app.get('/fail',(req,res)=>{
        console.log("in fail");
        res.send({"error":true});
    });
    app.post('/signUp' , passport.authenticate('signUp',{
        failureRedirect:'/fail'
    }),(req,res)=>{
        console.log('success user ');
        console.log(req.session.passport.user.token);
        res.header('token', req.session.passport.user.token).send( req.session.passport.user);
    });

    app.post("/addImg",auth, upload.array("uploads[]", 12), place.addImage);
    app.post('/addPlace', auth, place.addPlace);
    app.get('/display',auth, place.displayPlace);
    app.get('/displayImg',auth, place.displayImage);
    app.get('/deletePlace',auth, place.deletePlace);
    app.get('/page', auth, place.serverPage);
    app.get('/totalRecord', auth, place.totalRecord);
    app.post('/date', place.displayPlaceDateWise);
    app.get('/findById', auth, place.findPlaceById);

    app.get('/check', user.checkToken);
    app.get('/displayUser', auth, user.displayUserData);
    app.delete('/deleteUser', auth, user.deleteUser);
    app.post('/changePassword', auth, user.chagePassword);

    app.get('/state', hotel.selectState);
    app.get('/city', hotel.selectCity);
    app.post('/addHotel', hotel.addHotel);

    app.post("/addHotelImg",auth, uploadImg.array("uploads[]", 12), hotel.addHotelImage);
    app.get('/displayHotel',auth, hotel.displayHotel);
    app.get('/displayHotelImg', hotel.displayImg);
    app.get('/deleteHotel',auth, hotel.deleteHotel);
    app.get('/findHotel', auth, hotel.findHotelById);
    app.get('/getRoom', hotel.getRoom);
    app.post('/addRoom', uploadRoom.single('uploadRoom'), hotel.addRoom);

    app.get('/countUser', user.totalRecord);
    app.get('/counthotel', hotel.totalRecord);
    app.get('/countPlace', place.totalRecord);

    app.get('/getHotels', hotel.getHotels);
};


