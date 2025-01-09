const UserModel = require("../models/userModel");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function checkPassword(request, response) {
    try {
        const { password, userId } = request.body;

        // User find karte hain database se
        const user = await UserModel.findById(userId);

        // Agar user nahi milta
        if (!user) {
            return response.status(404).json({
                message: "User not found",
                error: true
            });
        }

        // Password verify karte hain
        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) {
            return response.status(400).json({
                message: "Please check password",
                error: true
            });
        }

        // JWT token generate karte hain
        const tokenData = {
            id: user._id,
            email: user.email
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, { expiresIn: '1d' });

        // Cookie options define karte hain
        const cookieOption = {
            http: true,
            secure: true
        };

        // Cookie set karte hain aur response bhejte hain
        response.cookie('token', token, cookieOption).status(200).json({
            message: "Login successfully",
            token: token,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = checkPassword;