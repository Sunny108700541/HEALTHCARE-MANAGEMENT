const User = require('../models/user'); // Assuming you have a User model
const { sendEmail } = require('../utils/emailservice'); // Ensure this matches your email service file
const crypto = require('crypto'); // For token generation
const jwt = require("jsonwebtoken"); // For creating tokens

// User registration
const register = async (req, res) => {
    try {
        const { name, age, email, password } = req.body;

        // Input validation
        if (!name || !age || !email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists!' });
        }

        // Create new user in the database
        const user = new User({ name, age, email, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error in registration:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

// Login function
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required!' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Check password (assuming passwords are stored hashed)
        const isMatch = await user.comparePassword(password); // Implement this method in your User model
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password!' });
        }

        // Generate a token
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' }); // Replace 'your_jwt_secret' with your actual secret

        res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

// Export the controller functions
module.exports = {
    register, // Using shorthand property name
    login,    // Added login function
    // Other functions can be added here
};

// Debugging logs
console.log('UserController loaded');
