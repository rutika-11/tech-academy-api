import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ✅ Input validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Send response (no password)
        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        // ✅ Better error handling
        res.status(500).json({ message: error.message });
    }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Input validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET, // ✅ fixed (no fallback)
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};