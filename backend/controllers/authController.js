const userModel = require("../model/user");
const {generateToken} = require("../utils/jwtUtils");
const bcrypt = require("bcryptjs")


const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, role } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if user already exists
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        await userModel.create({
            name,
            email,
            password: hashedPassword,
            role: role || "Attendee" // Default to "Attendee" if role is not provided
        });


        return res.status(201).json({ message: "Account created successfully", success: true});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the user in the database
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username",
                success: false
            });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password); // changed from userModel.password to user.password
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            });
        }

        // Generate a JWT token using the generateToken function
        const token = generateToken(user._id);

        // Send success response with token
        return res.status(200).json({
            message: "Login successful",
            token,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


module.exports = {register, login}

