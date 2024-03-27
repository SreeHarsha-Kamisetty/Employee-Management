const express = require("express")
const { register, login } = require("./user.routes");
const { newEmployee, editEmployee, deleteEmployee, getEmployees } = require("./employees.routes");


const ApiRouter = express.Router()

// user routes
ApiRouter.post("/signup",register);
ApiRouter.post("/login",login)


// employee routes
ApiRouter.post("/employees",newEmployee)
ApiRouter.patch("/employees/:id",editEmployee)
ApiRouter.delete("/employees/:id",deleteEmployee)
ApiRouter.get("/employees",getEmployees)


module.exports={
    ApiRouter
}