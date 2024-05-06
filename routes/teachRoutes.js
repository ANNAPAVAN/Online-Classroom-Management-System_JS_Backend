const express = require("express")
const router = express.Router(); 

const {addAssignment, updateAssignment, deleteAssignment, getAllAssignments, updateStudentMarks, getAllSubmissions} = require( "../controllers/teachControllers.js");
const {verifyTeachToken} = require("../controllers/tokenController.js")


router.post("/addtask", verifyTeachToken , addAssignment);
router.post("/updatetask/:id",verifyTeachToken ,updateAssignment);
router.delete("/deletetask/:id",verifyTeachToken, deleteAssignment);

router.get("/getalltasks/:id",verifyTeachToken ,getAllAssignments);

router.get("/getstdans/:id",verifyTeachToken , getAllSubmissions);

router.post("/updatemarks",verifyTeachToken , updateStudentMarks);

module.exports = router;

 