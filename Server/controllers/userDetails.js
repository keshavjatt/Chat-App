const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

async function userDetails(request, response) {
    try {
        const token = request.cookies.token || null;

        if (!token) {
            return response.status(401).json({
                message: "Token missing or session expired",
                logout: true,
            });
        }

        const user = await getUserDetailsFromToken(token);

        if (!user) {
            return response.status(404).json({
                message: "User not found",
            });
        }

        return response.status(200).json({
            message: "User Details fetched successfully",
            data: user,
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
        });
    }
}

module.exports = userDetails;