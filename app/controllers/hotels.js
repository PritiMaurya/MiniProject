var {con} = require('../db/connection');

module.exports = {
    addHotel: (req,res)=>{
        var sql = "insert into hotel (hotelName, hotelAdd, contactNo, city, state, hotelType, totalNoRoom) values(?,?,?,?,?,?,?)";
        con.query(sql, [req.bady.hotelName, req.body.hotelAdd, req.body.contact, req.body.city, req.body.state, req.body.hotelType, req.body.total], (err, data)=>{
            if(err) {
                res.send({error: true, message: 'Error while insert Data'});
            } else {
                res.send({error: false, message: 'Hotel successfully added', data: data});
            }
        });
    }
}
