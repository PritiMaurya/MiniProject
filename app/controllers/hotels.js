var {con} = require('../db/connection');


module.exports = {
    addHotel: (req,res)=>{
        var sql = "insert into hotel (placeId, hotelName, hotelAdd, contactNo, city, state, hotelType, totalNoRoom, availRoom, date) values(?,?,?,?,?,?,?,?,?,?)";
        con.query(sql, [req.body.placeId, req.body.hotelName, req.body.hotelAdd, req.body.contact, req.body.city, req.body.state, req.body.hotelType, req.body.total, req.body.total, new Date()], (err, data)=>{
            if(err) {
                console.log(err);
                res.send({error: true, message: 'Error while insert Data'});
            } else {
                var sql = "select * from hotel where  hotelId= ?";
                con.query(sql, [data.insertId],(err, data1)=>{
                    res.send({error: false, message: 'Hotel successfully added', data: data1[0]});
                });

            }
        });
    },
    selectState: (req,res)=>{
        var sql = "SELECT DISTINCT state FROM state";
        con.query(sql, (err, state)=>{
            if(err) {
                res.send({error: true, message: 'Error while fetching data'});
            } else {
                res.send({error: false, state: state});
            }
        })
    },
    selectCity: (req,res)=>{
        var s = req.query.state;
        var sql = "SELECT city FROM state where state like ?";
        con.query(sql, [s], (err, cities)=>{
            if(err) {
                res.send({error: true, message: 'Error while fetching data'});
            } else {
                res.send({error: false, city: cities});
            }
        })
    },
    addHotelImage: (req,res)=>{
        // console.log('files', req.files);
        let id =  req.query.id;
        let errFlag;
        for(let i=0; i < req.files.length; i++){
            let sql = "insert into hotelImg(hotelId, image, imageName) values(?, ?, ?)";
            // sql = mysql.format(id, );
            console.log(req.files[i]);
            con.query(sql,[id, req.files[i].path, req.files[i].filename], (err, response)=>{
                if(err){
                    console.log(err);
                    errFlag = true;
                }
                if(response){
                    console.log('res');
                    errFlag = false;
                }
            });
            console.log(req.files[i].path);
        }
        console.log({data: 'data'});
        res.send({data: 'data'});
    },
    displayHotel: (req,res) => {
        var pageNo = parseInt(req.query.pageNo);
        var size = parseInt(req.query.size);
        let reverse = JSON.parse(req.query.order);
        let key = req.query.key;
        let sql1;
        let response;
        // console.log(reverse);
        if(pageNo < 0 || pageNo === 0) {
            response = {"error" : true,"message" : "invalid page number, should start with 1"};
            return res.json(response);
        }
        let sql = "SELECT count(*) as count FROM `hotel` WHERE isDelete = 0";
        con.query(sql, (err, totalCount)=>{
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"}
            }
            if(reverse) {
                sql1 = "select * from hotel where isDelete = 0 order by "+key+" desc limit ?, ?";
            } else {
                sql1 = "select * from hotel where isDelete = 0 order by "+key+" limit ?, ?";
            }
            con.query(sql1, [size * (pageNo - 1), size], (err,data)=>{
                if(err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                } else {
                    var totalPages = Math.ceil( totalCount[0].count / size);
                    response = {"error" : false,"message" : data,"pages": totalPages};
                }
                res.json(response);
            });
        });
    },
    deleteHotel: (req,res)=>{
        let id =  req.query.id;
        let response;
        const sql = "update hotel set isDelete = 1 where hotelId=?";
        con.query(sql,[id], (err, data)=>{
            if(err){
                response = {err: true};
            } else {
                response = {err: false, data: data};
            }
            res.send(response);
        });
    },
    displayImg: (req,res)=>{
        var id =  req.query.id;
        const sql = "select * from hotelImg where isDelete = 0 && hotelId=?";
        con.query(sql,[id], (err, data)=>{
            if(data){
                res.send(data);
            }
        });
    },
    findHotelById: (req,res)=>{
        let id = req.query.id;
        let sql = "select * from hotel where hotelId =?";
        console.log(sql);
        con.query(sql,[id], (err, data)=> {
            if (err) {
                response = {"error": true, "message": "Error fetching data"}
            }
            res.send(data[0]);
        });
    },
    totalRecord: (req,res)=>{
        let sql = "SELECT count(*) as count FROM hotel WHERE isDelete = 0";
        con.query(sql, (err, totalCount)=> {
            if (err) {
                response = {"error": true, "message": "Error fetching data"}
            }
            res.send(totalCount[0]);
        });
    },
    addRoom: (req,res)=>{
        let hotelId = req.query.id;
        let sql = "insert into hotelRoom (roomNumber, hotelId, rate, roomType) values(?, ?, ?, ?)";
        con.query(sql, [req.body.no, hotelId, req.body.rate, req.body.roomType], (err)=>{
            if(err) {
                console.log(err);
                res.send({"error": true, "message": "Error While inserting data"});
            } else {
                res.send({"error": false, "message": "Room detail successfully added"});
            }
        });
    }
}

