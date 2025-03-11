const UserModel = require("../models/UserModel"); // Ensure case-sensitive match
const bcryptjs = require('bcryptjs');

async function registerUser(request, response) {
    try {
        const { name, email, password, profile_pic } = request.body;

        const checkEmail = await UserModel.findOne({ email });

        if (checkEmail) {
            return response.status(400).json({
                message: "User already exists",
                error: true,
            });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashpassword = await bcryptjs.hash(password, salt);

        const user = new UserModel({
            name,
            email,
            profile_pic,
            password: hashpassword
        });

        const userSave = await user.save();

        return response.status(201).json({
            message: "User created successfully",
            data: userSave,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || "Internal Server Error",
            error: true
        });
    }
}

module.exports = registerUser;