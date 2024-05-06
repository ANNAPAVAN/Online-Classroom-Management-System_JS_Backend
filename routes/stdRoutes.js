const express = require("express")
const router = express.Router(); 

const {getAllStudentAssignments, postStudentAns} = require( "../controllers/stdControllers.js");
const {verifyStdToken} = require("../controllers/tokenController.js")

router.get("/getallstdtasks",verifyStdToken, getAllStudentAssignments);
router.post("/postans", verifyStdToken , postStudentAns);

module.exports = router;

