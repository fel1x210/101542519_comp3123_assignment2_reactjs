const express = require("express")
const bcrypt = require("bcrypt")
const UserModel = require("../model/users")
const { default: mongoose } = require("mongoose")
const { validateUserSignup, validateUserLogin } = require("../middleware/validation")
const { generateToken } = require("../middleware/auth")

const routes = express.Router()

// Allow user to create new account
routes.post("/signup", validateUserSignup, async (req, res) => {
    try {
        const { username, email, password } = req.body

        // Check if user already exists
        const existingUser = await UserModel.findOne({
            $or: [{ email: email }, { username: username }]
        })

        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: "User already exists with this email or username"
            })
        }

        // Hash the password
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Create new user
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        // Remove password from response
        const userResponse = savedUser.toObject()
        delete userResponse.password

        res.status(201).json({
            status: true,
            message: "User created successfully.",
            user_id: savedUser._id
        })

    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error
            const field = Object.keys(error.keyPattern)[0]
            return res.status(400).json({
                status: false,
                message: `${field} already exists`
            })
        }

        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

// POST /api/v1/user/login - Allow user to access the system
routes.post("/login", validateUserLogin, async (req, res) => {
    try {
        const { email, password } = req.body

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required"
            })
        }

        // Find user by email
        const user = await UserModel.findOne({ email: email })

        if (!user) {
            return res.status(400).json({
                status: false,
                message: "Invalid email or password"
            })
        }

        // Compare password
        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return res.status(400).json({
                status: false,
                message: "Invalid email or password"
            })
        }

        // Generate JWT token
        const token = generateToken({
            user_id: user._id,
            username: user.username,
            email: user.email
        });

        // Login successful
        res.status(200).json({
            message: "Login successful.",
            jwt_token: token
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

module.exports = routes