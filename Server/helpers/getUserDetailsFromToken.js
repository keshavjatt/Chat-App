const jwt = require('jsonwebtoken');
const UserModel = require("../models/userModel");

const getUserDetailsFromToken = async (token) => {
    if (!token) {
        return {
            message: "Session out",
            logout: true
        };
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECREAT_KEY); // JWT verify
        const user = await UserModel.findById(decode.id).select('-password');

        if (!user) {
            return {
                message: "User not found",
                logout: true
            };
        }

        return user; // Return user if found
    } catch (error) {
        throw new Error("Invalid token or expired session");
    }
};

module.exports = getUserDetailsFromToken;