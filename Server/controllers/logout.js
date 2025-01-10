async function logout(request, response) {
    try {
        const cookieOption = {
            http: true, // yeh `http` nahi, `httpOnly` hona chahiye
            secure: true
        };

        return response.cookie('token', '', cookieOption).status(200).json({
            message: "session out",
            success: true
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = logout;