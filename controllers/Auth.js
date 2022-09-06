const User = require("../models/User");
const {BadRequestError, UnauthenticatedError} = require("../errors/index")

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
    const { email, password } = req.body;

    if(!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({ email })

    if(!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    const passwordOk = await user.checkPassword(password)
    if(!passwordOk) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    const token = user.createJWT();

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            user,
            token
        }
    })
}

module.exports = { register, login }
