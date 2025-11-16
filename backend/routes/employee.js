const express = require("express")
const EmployeeModel = require("../model/employees")
const { default: mongoose } = require("mongoose")
const { 
    validateEmployeeCreate, 
    validateEmployeeUpdate, 
    validateEmployeeId, 
    validateEmployeeIdQuery 
} = require("../middleware/validation")
const { verifyToken } = require("../middleware/auth")

const routes = express.Router()

// User can get all employee list
routes.get("/employees", verifyToken, async (req, res) => {
    EmployeeModel.find()
        .then((employees) => {
            res.status(200).json({
                status: true,
                message: "Employees fetched successfully",
                count: employees.length,
                data: employees
            })
        })
        .catch((err) => {
            res.status(500).json({
                status: false,
                message: err.message
            })
        })
})

// Search employees by department or position
routes.get("/employees/search", verifyToken, async (req, res) => {
    try {
        const { department, position } = req.query

        // Build search query
        const searchQuery = {}
        if (department) {
            searchQuery.department = { $regex: department, $options: 'i' } // Case-insensitive search
        }
        if (position) {
            searchQuery.position = { $regex: position, $options: 'i' } // Case-insensitive search
        }

        // If no search parameters provided
        if (!department && !position) {
            return res.status(400).json({
                status: false,
                message: "Please provide at least one search parameter: department or position"
            })
        }

        // Find employees matching the search criteria
        const employees = await EmployeeModel.find(searchQuery)

        res.status(200).json({
            status: true,
            message: "Search completed successfully",
            count: employees.length,
            data: employees
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

// User can create new employee
routes.post("/employees", verifyToken, validateEmployeeCreate, async (req, res) => {
    try {
        const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body

        // Validate required fields
        if (!first_name || !last_name || !email || !position || !salary || !date_of_joining || !department) {
            return res.status(400).json({
                status: false,
                message: "All fields are required: first_name, last_name, email, position, salary, date_of_joining, department"
            })
        }

        // Check if employee with email already exists
        const existingEmployee = await EmployeeModel.findOne({ email: email })
        if (existingEmployee) {
            return res.status(400).json({
                status: false,
                message: "Employee with this email already exists"
            })
        }

        // Create new employee
        const newEmployee = new EmployeeModel({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        })

        const savedEmployee = await newEmployee.save()

        res.status(201).json({
            status: true,
            message: "Employee created successfully.",
            employee_id: savedEmployee._id
        })

    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error
            return res.status(400).json({
                status: false,
                message: "Employee with this email already exists"
            })
        }

        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

// User can get employee details by employee id
routes.get("/employees/:eid", verifyToken, validateEmployeeId, async (req, res) => {
    try {
        const employeeId = req.params.eid

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid employee ID"
            })
        }

        // Find employee by ID
        const employee = await EmployeeModel.findById(employeeId)

        if (!employee) {
            return res.status(404).json({
                status: false,
                message: `Employee not found for id: ${employeeId}`
            })
        }

        // Transform the data to match the required format
        const formattedEmployee = {
            employee_id: employee._id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            position: employee.position,
            salary: employee.salary,
            date_of_joining: employee.date_of_joining,
            department: employee.department
        }
        
        res.status(200).json(formattedEmployee)

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

// User can update employee details
routes.put("/employees/:eid", verifyToken, validateEmployeeId, validateEmployeeUpdate, async (req, res) => {
    try {
        const employeeId = req.params.eid
        const updateData = req.body

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid employee ID"
            })
        }

        // If email is being updated, check for duplicates
        if (updateData.email) {
            const existingEmployee = await EmployeeModel.findOne({ 
                email: updateData.email, 
                _id: { $ne: employeeId } 
            })
            if (existingEmployee) {
                return res.status(400).json({
                    status: false,
                    message: "Employee with this email already exists"
                })
            }
        }

        // Update employee
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(employeeId, updateData, { 
            new: true,
            runValidators: true
        })

        if (!updatedEmployee) {
            return res.status(404).json({
                status: false,
                message: `Employee not found for id: ${employeeId}`
            })
        }

        res.status(200).json({
            status: true,
            message: "Employee details updated successfully."
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

// User can delete employee by employee id
routes.delete("/employees", verifyToken, validateEmployeeIdQuery, async (req, res) => {
    try {
        const employeeId = req.query.eid

        if (!employeeId) {
            return res.status(400).json({
                status: false,
                message: "Employee ID is required in query parameter 'eid'"
            })
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid employee ID"
            })
        }

        // Delete employee
        const deletedEmployee = await EmployeeModel.findByIdAndDelete(employeeId)

        if (!deletedEmployee) {
            return res.status(404).json({
                status: false,
                message: `Employee not found for id: ${employeeId}`
            })
        }

        res.status(204).json({
            status: true,
            message: "Employee deleted successfully."
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

module.exports = routes