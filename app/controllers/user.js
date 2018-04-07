var {con} = require('../db/connection');
var bcrypt = require('bcrypt');
var mysql = require('mysql');
module.exports={
    checkToken: (req,res)=>{
        var token = req.query.token;
        let sql = "select token from user where token =?";
        con.query(sql, [token],(err,data)=>{
            if(data){
                console.log('check token');
                res.send(data);
            } else{
                res.send(err);
            }
        });
    },

    deleteUser: (req,res)=>{
        let response;
        var id = req.query.id;
        let sql = "update user set isDelete = 1 where userId = ?";
        con.query(sql,[id], (err,data)=>{
            if(err){
                response = {err: true};
            } else {
                response = {err: false, data: data};
            }
            res.send(response);
        });
    },

    displayUserData: (req,res) => {
        let response;
        let pageNo = parseInt(req.query.pageNo);
        let size = parseInt(req.query.size);
        let reverse = JSON.parse(req.query.order);
        // console.log('reverse ' + reverse);
        let sql1;
        if(pageNo < 0 || pageNo === 0) {
            response = {"error" : true,"message" : "invalid page number, should start with 1"};
            return res.json(response)
        }
        let sql = "SELECT count(*) as count FROM `user` WHERE isDelete = 0 && role = 'user'";
        con.query(sql, (err, totalCount)=>{
            if(err) {
                response = {"error" : true,"message" : "Error fetching data1"}
            }
            if (reverse){
                // console.log(reverse, 'true');
                // console.log('true');
                sql1 = "select * from user where isDelete = 0 && role = 'user' order by userName desc LIMIT ?, ?"
            } else{
                console.log('false');
                sql1 = "select * from user where isDelete = 0 && role = 'user' order by userName limit ?, ?";
            }
            con.query(sql1, [size * (pageNo - 1), size], (err,data)=>{
                if(err) {
                    response = {"error" : true,"message" : "Error fetching data2"};
                } else {
                    var totalPages = Math.ceil( totalCount[0].count / size);
                    response = {"error" : false,"message" : data,"pages": totalPages};
                }
                res.json(response);
            });
        });
    },

    hello: (req,res)=>{
        let token = req.header('token');
        console.log(token);
        res.send({token: token});
    }
}


