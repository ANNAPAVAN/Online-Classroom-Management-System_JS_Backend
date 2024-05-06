const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const {db} = require("../utils/DB.js")
const {config} = require("../config/index.js")

const signUp = async (req, res) => {
    console.log("i am registering")
     const {name,email,password,role} = req.body; 

     const query = "SELECT * FROM users WHERE email = ?";

     db.query(query, [email] , async (err,results) => {
        if(err){
            return res.json({status: "failure error 1",err});
        }
        if(results.length >0){
            return  res.json({status:"existed"})
        }else{
            const insertQuery = "Insert into users values (?,?,?,?)";
            db.query(insertQuery, [name,email,password,role], (err,result)=>{
                if(err){
                    return res.json({status:"failure error 2",err})
                }
                return res.json({ status: "success"});
            })
        }
     })
};


const signIn = async (req, res) => {
    const {email, password}= req.body;

    const query = "select * from users where email = ?";

    db.query(query,[email], async (err,results) => {
        if(err){
            return res.json({status:"failure1",err});
        }
        if(results.length<1){
            return res.json({status:"failure2",message:"Email not found!"})
        }
        const user = results[0];
        const role = user.role;
        const dbpwd = user.password;

        if(password == dbpwd){
            const token = JWT.sign({email,role}, config.JWT_SECRET_KEY,{expiresIn:"10h"})

            return res.json({status:"success",token});
        }else{
            return res.json({status:"failure3"});
        }
    })
}

const verifyToken = async (req,res) => {
    const token = req.params.id;
    try{
        const decoded = JWT.verify(token,config.JWT_SECRET_KEY)
        const email = decoded.email;
        console.log("token valid");
        return res.json({status:"verified",email})
    }catch(err){
        console.log("token in-valid");
        return res.json({status:"invalid_token"})
    }
};

module.exports = { signUp ,signIn, verifyToken};
