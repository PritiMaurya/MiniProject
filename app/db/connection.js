var mysql = require('mysql');
var environment = require('../environment');

var con = mysql.createConnection({
    host: environment.host,
    user: environment.user,
    password: "",
    database: environment.db,
    port: 3306
});

con.connect((err,res)=>{
    if(err){
        console.log('err');
        console.log(err);
    }
    if(res){
        console.log("connected");
        //console.log(res);
    }
});

module.exports = {
    con
}