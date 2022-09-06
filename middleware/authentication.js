const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const header = req.headers.authorization;

    if(!header || !header.startsWith('Bearer')) {
        throw new UnauthenticatedError("Unauthorized")
    }

    const token = header.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            id: payload.id,
            name: payload.name
        }
        next()
    } catch (error) {
        throw new UnauthenticatedError("Unauthorized ")
    }
}

module.exports = auth
