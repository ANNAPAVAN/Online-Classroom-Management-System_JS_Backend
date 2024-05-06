const JWT = require("jsonwebtoken");
const { config } = require("../config/index.js");


const verifyTeachToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({ status: "failure", message: "No token provided." });
    }

    try {
        const decoded = JWT.verify(token, config.JWT_SECRET_KEY);
        const role = decoded.role;
        if(role!="teacher"){
            return res.json({ status: "failure", message:  "Not Authorized"  });
        }
        // console.log("token verified u can proceed");
        next();
    } catch (err) {
        return res.json({ status: "failure", message: "Invalid token." });
    }
};

const verifyStdToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({ status: "failure", message: "No token provided." });
    }

    try {
        const decoded = JWT.verify(token, config.JWT_SECRET_KEY);
        const role = decoded.role;
        if(role!="student"){
            return res.json({ status: "failure", message: "Not Authorized" });
        }
        next();
    } catch (err) {
        return res.json({ status: "failure", message: "Invalid token." });
    }
};


module.exports = { verifyStdToken ,verifyTeachToken};
