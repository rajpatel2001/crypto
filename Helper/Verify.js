const JWT = require('jsonwebtoken');
const User = require("../Models/User");

const Verify = async (req, res, next) => {
    try {
        const token = req.cookies.cryptowall;

        if (token) {
            // const token = authHeader.split(" ")[1];
            // console.log(token);
            const verified = JWT.verify(token, process.env.JWT_SEC_KEY);
            const rootUser = await User.findOne({
                _id: verified.id
            });

            // console.log(rootUser);

            if (!rootUser) {
                return res.status(201).json({
                    "success": false,
                    "message": "User Not Found"
                })
            }

            req.token = token;
            let { password, ...rest } = rootUser._doc;
            // console.log(rest);

            req.rootUser = rest;
            req.userId = rootUser._id;

            next();

        } else {
            return res.status(201).json({
                "success": false,
                "message": "Please Login to Perform This"
            })
        }
    } catch (err) {
        res.status(401).json({ "success": false, "message": "Unauthorized User" });
        console.log(err);
    }
}

module.exports = Verify;