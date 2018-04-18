var {con} = require('../db/connection');
var bcrypt = require('bcrypt');
var mysql = require('mysql');
module.exports={
    checkToken: (req,res)=>{
        var token = req.query.token;
        let sql = "select token from user where token =? && role like 'admin'";
        con.query(sql, [token],(err,data)=>{
            if(data){
                console.log('check token');
                if(data.length > 0) {
                    res.send({error: false, data: data[0]});
                } else {
                    res.send({error: true, message: 'Unauthorized access'});
                }
            } else{
                res.send({error: true, message: 'Unable to check token'});
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
        let key = req.query.key;
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
                sql1 = "select * from user where isDelete = 0 && role = 'user' order by "+key+" desc LIMIT ?, ?"
            } else{
                console.log('false');
                sql1 = "select * from user where isDelete = 0 && role = 'user' order by "+key+" limit ?, ?";
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

    chagePassword: (req,res)=>{
        let password = req.body.password;
        let newPass = req.body.newPass;
        let token = req.header('token');
        console.log('password', newPass);
        let sql = "select password from user where role = 'admin' && token = ?";
        con.query(sql, [token],(err, data)=>{
            if(err){
                res.send({error: true, message: 'Unable to fetch Password from database'});
            } else {
                if(camparePass(password, data[0].password)){
                    let sql2 = "update user set password = ? where token = ?";
                    con.query(sql2, [hashPass(newPass), token], (err)=>{
                        if(err){
                            res.send({error: true, message: 'Error while updating password'});
                        } else {
                            res.send({error: false, message: 'Your Password is successfully Updated'});
                        }
                    });
                } else {
                    res.send({error: true, message: 'Old password is Invalid'});
                }
            }
        })
    },
    totalRecord: (req,res)=>{
        let sql = "SELECT count(*) as count FROM user WHERE isDelete = 0";
        con.query(sql, (err, totalCount)=> {
            if (err) {
                response = {"error": true, "message": "Error fetching data"}
            }
            res.send(totalCount[0]);
        });
    },

}

function camparePass(password, userPass) {
    return bcrypt.compareSync(password, userPass);
}

function hashPass(newPass) {
    // console.log(bcrypt.hashSync('admin@12', bcrypt.genSaltSync(10)));
    console.log('at hash password', newPass);
    return bcrypt.hashSync(newPass, bcrypt.genSaltSync(10), null);
}


