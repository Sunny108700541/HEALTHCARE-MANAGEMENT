// controllers/UserController.js
const User = require('../models/user'); // Assuming you have a User model
const { sendEmail } = require('../utils/emailService'); // Ensure this matches your email service file
const crypto = require('crypto'); // For token generation
const jwt=require("jsonwebtoken");
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

// Forgot Password function
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Input validation
        if (!email) {
            return res.status(400).send('Email is required!');
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found!');
        }

        // Generate token and set expiration
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // Create reset link
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

        // Send email with the reset link
        await sendEmail(
            user.email,
            'Password Reset Link',
            `Your password reset link is: ${resetLink}`,
            `<h1>Your password reset link is: <a href="${resetLink}">Reset Password</a></h1>`
        );

        res.send('Password reset link sent to your email!');
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).send('Server error, please try again later.');
    }
};

// Export the controller functions
module.exports = {
    register,       // Using shorthand property name
    forgotPassword,  // Using shorthand property name
    // Add other user-related functions here
};
