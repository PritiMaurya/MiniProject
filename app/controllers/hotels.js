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
                    res.send({error: false, message: 'Hotel successfully added', data: data1});
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
    addImage: (req,res)=>{
        // console.log('files', req.files);
        var id =  req.query.id;
        let errFlag;
        for(let i=0; i < req.files.length; i++){
            var sql = "insert into hotelImg(hotelId, image) values(?, ?)";
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
    }
}
