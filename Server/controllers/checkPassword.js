const UserModel = require("../models/userModel")

async function checkPassword(request, response){
    try {
        const { password, userId } = request.body

        const user = await UserModel.findById(userId)

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}