const express = require("express")
const cors = require("cors")
const app = express() 

const routes = require("./routes/index.js");

app.use(express.json());
app.use(cors())


app.use("/api", routes);
 

app.get("/",(req,res)=> {
    return res.json("Backend File")
}) 

app.listen(8999, ()=>{
    console.log("running in port 8999")
})








// Host: sql6.freesqldatabase.com
// Database name: sql6696255
// Database user: sql6696255
// Database password: QKCVPC7WmM
// Port number: 3306