const jwt = require("jsonwebtoken");
const client = require("../configs/database");

exports.verifyToken = (req,res,next) => {

    const token = req.headers.authorization;

    jwt.verify(token, ""+process.env.SECRET_KEY, (err, decoded) => {
        if(err){
            console.log(err);
            res.status(500).json({
                error: "server error occured",
            });
            
        }else{
            const userEmail = decoded.email;

            client.query(`SELECT *FROM users where email = '${userEmail}'`).then((data) => {
                if(data.rows.length == 0){
                    res.status(400).json({
                        message: "Invalid token",
                    });
                }else{
                    req.email = userEmail;
                    next();
                }
            }).catch((err) => {
                res.status(500).json({
                    message: "Database error occured",
                });
            });
        }
    })
};