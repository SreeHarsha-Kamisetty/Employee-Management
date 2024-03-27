const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { ApiRouter } = require("./routes/api.routes");
require("dotenv").config()
const PORT = process.env.PORT || 8080


const app = express();
app.use(express.json())
app.use(cors())

app.use("/api",ApiRouter);
app.get("/",(req,res)=>{
    res.send("Home");
})


app.listen(PORT,async()=>{

    try {
        await connection
        console.log("connected to DB");
        console.log(`Server is running at http://localhost:${PORT}`)

    } catch (error) {
        console.log(error)
    }
})