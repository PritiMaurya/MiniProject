let jwt = require('jsonwebtoken');
let environment = require('../environment');

module.exports = (req,res, next)=>{
    let token = req.header('token');
    let response;
    console.log('header', token);
    if(token){
        jwt.verify(token, environment.secret, (err, t)=>{
            if(err){
                response = {error: true, message: 'token invalid'};
                res.send(response);
            } else {
                next();
            }
        });
    } else {
        response = {error: true, message: 'Unauthorize Access'};
        res.send(response);
    }
}
