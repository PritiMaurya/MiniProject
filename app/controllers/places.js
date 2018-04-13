var {con} = require('../db/connection');
var mysql = require('mysql');


module.exports={
    addPlace: (req,res)=>{
        var sql = "insert into place(placeName, placeDescription, date) values(?, ?, ?)";
        con.query(sql, [req.body.pName, req.body.pDesc, new Date()], (err, data)=>{
            if(err){
                console.log('err');
                console.log(err);
                res.send({"error":"failed"})
            }
            if(data){
                var s = "select * from place where placeId = ?";
                s = mysql.format(s, data.insertId);
                con.query(s, (err, place)=>{
                    if(place){
                        res.send(place);
                    }
                });
            }
        });
    },
    addImage: (req,res)=>{
        // console.log('files', req.files);
        var id =  req.query.id;
        let errFlag;
        for(let i=0; i < req.files.length; i++){
            var sql = "insert into placeImg(placeId, img, imgName) values(?, ?, ?)";
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
        //console.log({data: 'data'});
        res.send({data: 'data'});
    },

    displayPlace: (req,res)=>{
        const sql = "select * from place where isDelete = 0";
        con.query(sql, (err, data)=>{
            if(data){
                res.send(data);
            }
        });
    },

    displayImage: (req,res)=>{
        var id =  req.query.id;
        const sql = "select * from placeImg where isDelete = 0 && placeId=?";
        con.query(sql,[id], (err, data)=>{
            if(data){
                res.send(data);
            }
        });
    },

    deletePlace: (req,res)=>{
        let id =  req.query.id;
        let response;
        const sql = "update place set isDelete = 1 where placeId=?";
        con.query(sql,[id], (err, data)=>{
            if(err){
                response = {err: true};
            } else {
                response = {err: false, data: data};
            }
            res.send(response);
        });
    },

    serverPage: (req,res) => {
        var pageNo = parseInt(req.query.pageNo);
        var size = parseInt(req.query.size);
        let reverse = JSON.parse(req.query.order);
        let sql1;
        const key = req.query.key;
        let response;
        console.log(reverse);
        if(pageNo < 0 || pageNo === 0) {
            response = {"error" : true,"message" : "invalid page number, should start with 1"};
            return res.json(response);
        }
        let sql = "SELECT count(*) as count FROM `place` WHERE isDelete = 0";
        con.query(sql, (err, totalCount)=>{
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"}
            }
            if(reverse) {
                sql1 = "select * from place where isDelete = 0 order by "+key+" desc limit ?, ?";
            } else {
                sql1 = "select * from place where isDelete = 0 order by "+key+" limit ?, ?";
            }
            console.log(sql1);
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
    totalRecord: (req,res)=>{
        let sql = "SELECT count(*) as count FROM `place` WHERE isDelete = 0";
        con.query(sql, (err, totalCount)=> {
            if (err) {
                response = {"error": true, "message": "Error fetching data"}
            }
            res.send(totalCount[0]);
        });
    },
    displayPlaceDateWise: (req,res)=>{
        const key = req.query.key;
        console.log('key', key);
        let sql = "SELECT * FROM `place` order by "+key+" limit 5,10";
        console.log(sql);
        con.query(sql, (err, data)=> {
            if (err) {
                response = {"error": true, "message": "Error fetching data"}
            }
            res.send(data);
        });
    },
    findPlaceById: (req,res)=>{
        let id = req.query.id;
        let sql = "select * from place where placeId =?";
        console.log(sql);
        con.query(sql,[id], (err, data)=> {
            if (err) {
                response = {"error": true, "message": "Error fetching data"}
            }
            res.send(data[0]);
        });
    }
}

// var pageNo = parseInt(req.query.pageNo);
// var size = parseInt(req.query.size);
// if(pageNo < 0 || pageNo === 0) {
//     response = {"error" : true,"message" : "invalid page number, should start with 1"};
//     return res.json(response)
// }
// let sql = "SELECT count(*) as count FROM `place` WHERE isDelete = 0";
// con.query(sql, (err, totalCount)=>{
//     if(err) {
//         response = {"error" : true,"message" : "Error fetching data"}
//     }
//     let sql1 = "select * from place where isDelete = 0 limit ?, ?";
//     con.query(sql1, [size * (pageNo - 1), size], (err,data)=>{
//         if(err) {
//             response = {"error" : true,"message" : "Error fetching data"};
//         } else {
//             var totalPages = Math.ceil( totalCount[0].count / size);
//             // console.log('count', totalCount[0].count);
//             response = {"error" : false,"message" : data,"pages": totalPages};
//         }
//         res.json(response);
//     });
// });