const {db} = require("../utils/DB.js")

const addAssignment = async (req, res) => {

    const {desc,title,email,submission_date,marks} = req.body;
    const query = "insert into Assignments (title, description, user_email,submission_date,marks) values(?,?,?,?,?)";

    db.query(query,[title,desc,email,submission_date,marks], async (err,results) => {
        // console.log("task adddddd");
        if(err){
            // console.log("task adddddd------errrrrrr"); 
            return res.json({status:"failure"});
        }else{
            return res.json({status:"task added successfully"})
        }
    })
    
};

const updateAssignment = async (req, res) => {
    const assign_id = req.params.id;
    const { title, desc, email, submission_date } = req.body;
    const query = "UPDATE Assignments SET title = ?, description = ?, user_email = ?, submission_date = ? WHERE assignment_id = ?";
    
    db.query(query, [title, desc, email, submission_date, assign_id], async (err, results) => {
        if (err) {
            return res.json({ status: "failure" });
        } else if (results.affectedRows === 0) {
            return res.json({ status: "failure", error: "No assignment found with that ID." });
        } else {
            return res.json({ status: "success", message: "Task updated successfully" });
        }
    });
};

const deleteAssignment = async (req,res) => {

    const assign_id = req.params.id;

    const query = "delete from assignments where assignment_id = ?";
    db.query(query, [assign_id] , async (err,results) => {
        if(err) {
            return res.json({status:"failure"})
        }else if(results.affectedRows === 0){
            return res.json({status:"id not found"})
        }else{
            return res.json({status:"task deleted successfully"})
        }
    })
}

const getAllAssignments = async (req, res) => {
    const mail = req.params.id;
    const query = "SELECT * FROM Assignments WHERE user_email = ? ORDER BY submission_date";

    db.query(query, [mail], async (err, results) => {
        if (err) {
            return res.json({ status: "error in retrieval" });
        } 
        if(results.length === 0) {
            return res.json({ status: "No tasks found for this email." });
        } else {
            const tasks = results.map(task => {
                const dateStr = task.submission_date+ "";
                return {
                    assignment_id: task.assignment_id,
                    title: task.title,
                    description: task.description,
                    submission_date: dateStr,
                    marks: task.marks
                };
            });
            return res.json({ status: "success", tasks: tasks });
        }
    });
};

const updateStudentMarks = async (req, res) => {
    const { std_mail, assignment_id, marks } = req.body;

    const query = "UPDATE submit SET obtained_marks = ? WHERE std_email = ? AND assignment_id = ?";
    const values = [marks, std_mail, assignment_id];

    db.query(query, values, (err, result) => {
        if (err) {
            return res.json({ status: "error", message: "Failed to update marks." });
        }
        if (result.affectedRows === 0) {
            return res.json({ status: "error", message: "No matching record found for the provided email and assignment ID." });
        }
        return res.json({ status: "success", message: "Marks updated successfully." });
    });
};

const getAllSubmissions = async (req, res) => {
    const email = req.params.id;

    const query = `
        SELECT submit.assignment_id, submit.std_email, submit.task_sol, submit.total_marks, submit.date_of_Submission 
        FROM submit
        INNER JOIN assignments ON submit.assignment_id = assignments.assignment_id
        WHERE assignments.user_email = ?;
    `;

    db.query(query, [email], (err, results) => {
        if (err) {
            return res.json({ status: "error", message: "Failed to retrieve submissions." });
        }
        if (results.length === 0) {
            return res.json({ status: "success", message: "No submissions found for this email." });
        }
        const submissions = results.map(submission => {
            return {
                assignment_id: submission.assignment_id,
                std_email: submission.std_email,
                task_sol: submission.task_sol,
                marks: submission.total_marks,
                date_of_Submission: submission.date_of_Submission
            };
        });
        return res.json({ status: "success", submissions: submissions });
    });
};


module.exports = { addAssignment, updateAssignment, deleteAssignment, getAllAssignments, updateStudentMarks, getAllSubmissions };
