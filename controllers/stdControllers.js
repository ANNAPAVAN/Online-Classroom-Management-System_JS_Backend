const {db} = require("../utils/DB.js")

const getAllStudentAssignments = async (req, res) => {
    const query = "SELECT assignment_id,title, description, submission_date, marks FROM Assignments ORDER BY submission_date";

    db.query(query, async (err, results) => {
        if (err) {
            return res.json({ status: "error in retrieval" });
        } 
        if(results.length === 0) {
            return res.json({ status: "No tasks found for this email." });
        } else {
            const tasks = results.map(task => {
                const dateStr = task.submission_date+ "";
                return {
                    assignment_id:  task.assignment_id,
                    title: task.title,
                    description: task.description,
                    submission_date: dateStr,
                    total_marks: task.marks
                };
            });
            return res.json({ status: "success", tasks: tasks });
        }
    });
};

const postStudentAns = async (req, res) => {
    const { assignment_id, std_email, task_sol, date_of_Submission, total_marks } = req.body;

    const query = "INSERT INTO submit (assignment_id, std_email, task_sol, date_of_Submission, total_marks) VALUES (?, ?, ?, ?, ?)";
    const values = [assignment_id, std_email, task_sol, date_of_Submission, total_marks];

    db.query(query, values, (err, result) => {
        if (err) {
            return res.json({ status: "error", message: "Failed to submit assignment.  --> multiple submissions not allowed" });
        }
        return res.json({ status: "success", message: "Assignment submitted successfully." });
    });
};


module.exports = { getAllStudentAssignments, postStudentAns };
