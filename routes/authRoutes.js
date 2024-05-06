const express = require("express")
const router = express.Router(); 

const {signUp , signIn , verifyToken} = require( "../controllers/authControllers.js");

router.post("/register",signUp);
router.post("/login",signIn);
router.post("/verifytoken/:id",verifyToken);

module.exports = router;


