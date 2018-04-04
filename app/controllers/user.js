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
    }
}


