const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const getUserDetailsFromToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECREAT_KEY);

        if (!decoded || !decoded.id) {
            throw new Error("Invalid Token");
        }

        const user = await UserModel.findById(decoded.id);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        console.error("Error in getUserDetailsFromToken:", error.message);
        throw error;
    }
};

module.exports = getUserDetailsFromToken;