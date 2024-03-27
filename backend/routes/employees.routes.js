const { EmployeeModel } = require("../models/employee.models")



const newEmployee = async(req,res)=>{
    try {
        let newEmp = new EmployeeModel(req.body)
        await newEmp.save();
        res.status(200).json({Message:"New employee has been added"})

    } catch (error) {
        res.status(500).json({Error:"Error while creating new employee"})
    }
}

const editEmployee = async(req,res)=>{
    try {
        let  { id } = req.params

        let employee = await EmployeeModel.findOne({_id:id})

        if(!employee) return res.status(404).json({Message:"Employee not found"})

        await EmployeeModel.findByIdAndUpdate({_id:id},req.body)

        res.status(200).json({Message:"Employee details updated"})
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Error while updating employee details"})
    }
}

const deleteEmployee = async(req,res)=>{
    try {
        let  { id } = req.params

        let employee = await EmployeeModel.findOne({_id:id})

        if(!employee) return res.status(404).json({Message:"Employee not found"})

        await EmployeeModel.findByIdAndDelete({_id:id})

        res.status(200).json({Message:"Employee deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Error while deleting employee"})
    }
}


const getEmployees = async(req,res)=>{
    try {
        let {filterby,sortby,order,search,page,limit} = req.query;
        let totalEmp = await EmployeeModel.find().count();
        let employeeData;
        page = page || 1;
        limit = limit || 5;
        if(filterby){
            employeeData = await EmployeeModel.find({department:filterby}).skip((page-1)*limit).limit(limit)
        }
        if(sortby){
            if(order == "asc"){
                order = 1;
            }
            else{
                order = -1;
            }
            employeeData = await EmployeeModel.find().sort({salary:order}).skip((page-1)*limit).limit(limit)
        }

        if(search){
            employeeData = await EmployeeModel.find({firstName:search}).skip((page-1)*limit).limit(limit)
        }
        if(!(filterby || search || sortby)){
            employeeData = await EmployeeModel.find().skip((page-1)*limit).limit(limit)
        }
        res.status(200).json({totalCount:totalEmp,data:employeeData});

    } catch (error) {
        res.status(500).json({Error:"Error while getting data"})
    }
}

module.exports={
    newEmployee,editEmployee,deleteEmployee,getEmployees
}