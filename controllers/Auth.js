const register = async (req, res) => {
    res.send("Register user")
}

const login = async (req, res) => {
    res.send("Login")
}

module.exports = { register, login }
