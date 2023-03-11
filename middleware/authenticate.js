const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const authenticate = async (req, res, next) => {
    try {
        const token = await req.cookies.imageTokens;

        const isVerified = jwt.verify(token, process.env.KEY);
        const emailExist = await User.findOne({ email: isVerified.email, "tokens.token": token })

        if (!emailExist) {
            throw new Error("user not found");
        }
        req.email = isVerified.email;
        next();

    } catch (err) {
        res.status(401).json({ err: "unauthorised error" });
        console.log(err);
    }
}

module.exports = authenticate;