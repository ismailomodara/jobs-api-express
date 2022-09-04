const User = require("../models/User");
const {CustomAPIError} = require("../errors/index")

const register = async (req, res) => {

    const user = await User.create({ ...req.body })
    const token = user.createJWT();

    res.status(200).json({
        success: true,
        message: "User created",
        data: {
            user,
            token
        }
    })
}

const login = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        throw new CustomAPIError('Please provide email and password', 400)
    }

    const token = User.createJWT()

    res.send("Login")
}

module.exports = { register, login }
