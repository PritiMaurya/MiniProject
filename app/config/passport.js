var LocalStrategy= require("passport-local").Strategy;
const mysql=require('mysql');
const bcrypt=require('bcrypt');
const {con}=require('../db/connection');
const jwt = require('jsonwebtoken');
const environment = require('../environment');

module.exports=(passport)=>{
    passport.serializeUser((user,done)=>{
        console.log("In serialize ==>", user);
        return done(null,user);
    });
    passport.deserializeUser((user,done)=>{
        console.log("In Deserialize ==>", user);
        return done(null,user);
    });
    passport.use('signIn',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },(email,password,done)=>{
        let sql="select count(*) as cnt from user where email=?";
        sql=mysql.format(sql, email);
        con.query(sql, (err, data)=>{
            if(data[0].cnt > 0){
                let sql1 = "select * from user where email=?";
                sql1 = mysql.format(sql1, email);
                con.query(sql1, (err, result)=>{
                    if(result){
                        console.log('result', result);
                        if(bcrypt.compareSync(password, result[0].password)){
                            var tokenStr = result[0].email + new Date();
                            result[0].token = jwt.sign(tokenStr, environment.secret);
                            var update1 = "update user set token=? where userId=?"
                            con.query(update1, [result[0].token, result[0].userId], (err, uData)=>{
                                if(err){
                                    console.log(err);
                                }
                                if(uData){
                                    done(null, result[0]);
                                }
                            });
                        }
                        else{
                            console.log('Invalid Password');
                            done(null, false);

                        }
                    }
                });
            } else {
                console.log('Invalid Email');
                done(null, false);

            }
        });
    }));
    passport.use('signUp',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },(req,email,password,done)=>{
        let sql="select count(*) as cnt from user where email=?";
        sql=mysql.format(sql, email);
        con.query(sql, (err, data)=>{
            if(data[0].cnt > 0){
                console.log('Email is already exists');
                done(null, false);
            } else {
                var pass =hashPassword(password);
                var sql = "insert into user(userName,email,password,role,userMobile) values(?, ?, ?, ?, ?)";
                con.query(sql, [req.body.name, email, pass, req.body.role, req.body.mobile], (err, user)=>{
                    if(err){
                        console.log('err');
                        console.log(err);
                        done(null, false);
                    }
                    if(user){
                        console.log('res');
                        var s = "select * from user where email = ?";
                        s = mysql.format(s, email);
                        con.query(s, (err, res)=>{
                           if(res){
                               var tokenStr = res[0].email + new Date();
                               res[0].token = jwt.sign(tokenStr, environment.secret);
                               var update1 = "update user set token=? where userId=?"
                               con.query(update1, [res[0].token, res[0].userId],(err, uData)=>{
                                   if(err){
                                       console.log(err);
                                   }
                                   if(uData){
                                       done(null, res[0]);
                                   }
                               });
                           }
                        });
                    }
                });
            }
        });
    }));
};

var hashPassword = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}