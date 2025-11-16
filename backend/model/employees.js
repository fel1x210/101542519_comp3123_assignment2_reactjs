const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    first_name: { 
        type: String,
        required: [true, "First name is required"],
        trim: true,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    position: {
        type: String,
        required: [true, "Position is required"],
        trim: true,
        maxlength: 100
    },
    salary: {
        type: Number,
        required: [true, "Salary is required"], 
        min: [0, "Salary must be a positive number"]
    },
    date_of_joining: {
        type: Date,
        required: [true, "Date of joining is required"]
    },
    department: {
        type: String,
        required: [true, "Department is required"],
        trim: true,
        maxlength: 100
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

// Pre-save middleware to update the updated_at field
employeeSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model("Employee", employeeSchema)