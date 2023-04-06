// importing Modules
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const Verify = require("../Helper/Verify");
const nodemailer = require("nodemailer");

// importing Models
const User = require("../Models/User");

// Mail Sending Function
const sendMail = (token, toEmail) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'harshil.s.pethani9957@gmail.com',
            pass: process.env.EMAILPASSWORD
        }
    });

    var mailOptions = {
        from: 'harshil.s.pethani9957@gmail.com',
        to: toEmail,
        subject: 'CryptoWall Password Reset',
        text: `As You have Requested for reset password instructions, here they are, please click the URL or Copy the URL and Paste in your Browser \nhttps://cryptowal.herokuapp.com/reset_password?reset_password_token=${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email Sent");
        }
    })
}

// Register => /api/auth/register
router.post("/register", async (req, res) => {
    console.log(req.body);
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.cpassword) {
        res.status(201).json({ "success": false, "message": "Please Fill all the Fields" });
        return;
    }

    try {
        if (req.body.password === req.body.cpassword) {
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SEC_KEY).toString()
            })
            res.status(201).json({ "success": true, "message": "Account Creation Successfull" });
            return;

        } else {
            res.status(201).json({ "success": false, "message": "Password and Confirm Password Field Must be Same" });
            return;
        }

    } catch (e) {
        console.log(e);
        if (e.keyValue.username) {
            res.status(201).json({ "success": false, "message": "Email Address Already Exists" });
        }
        else if (e.keyValue.email) {
            res.status(201).json({ "success": false, "message": "Email Address Already Exists" });
        }
        else {
            res.status(500).json({ "success": false, "message": "Registration Failed" });
        }
    }
})

// Login => /api/auth/login
router.post("/login", async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(201).json({
            "success": false,
            "message": "Please Fill all the Fields"
        });
        return;
    }

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(201).send({
                "success": false,
                "message": "Invalid Credentials f"
            });
            return;
        }

        const decryptedPass = CryptoJS.AES.decrypt(
            user.password,
            process.env.AES_SEC_KEY
        ).toString(CryptoJS.enc.Utf8);

        // console.log(decryptedPass);

        if (decryptedPass !== req.body.password) {
            res.status(201).json({
                "success": false,
                "message": "Invalid Credentials p"
            });
            return;
        }

        const accessToken = JWT.sign(
            {
                id: user._id,
            },
            process.env.JWT_SEC_KEY,
            { expiresIn: "3d" }
        );
        res.cookie('cryptowall', accessToken);

        const { password, ...others } = user._doc;


        res.status(201).json({
            "success": true,
            "message": "Login Success",
            ...others,
            accessToken
        });

    } catch (e) {
        console.log(e)
        res.status(500).json({
            "success": false,
            "message": "Login Failed Internal Server Error"
        });
    }
})


// Forgot => /api/auth/forgot
router.post("/forgot", async (req, res) => {
    if (!req.body.email) {
        res.status(201).json({
            "success": false,
            "message": "Please Enter the Email Id"
        });
        return;
    }

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(201).send({
                "success": false,
                "message": "User Not Found"
            });
            return;
        }

        const accessToken = JWT.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SEC_KEY,
            { expiresIn: 60 * 5 }
        );

        sendMail(accessToken, req.body.email);

        res.status(201).json({
            "success": true,
            "message": "Password Reset Email Has been Sent.",
        });

    } catch (e) {
        // console.log(e)
        res.status(500).json({
            "success": false,
            "message": "Password Reset Failed",
        });
    }
})

// Reset Token Verify => /api/auth/reset_token_verify
router.post("/reset_token_verify", async (req, res) => {
    if (!req.body.token) {
        return res.status(201).json({
            "success": false,
            "message": "Invalid Password Reset URL"
        });
    }

    try {
        const verified = JWT.verify(req.body.token, process.env.JWT_SEC_KEY);
        const rootUser = await User.findOne({
            _id: verified.id
        });

        if (!rootUser) {
            return res.status(201).json({
                "success": false,
                "message": "User Not Found For Password Reset"
            })
        }

        res.status(201).json({
            "success": true,
            userId: verified.id
        });

    } catch (e) {
        // console.log(e)
        res.status(201).json({
            "success": false,
            "message": "Invalid Password Reset URL",
        });
    }
})

// Reset Password => /api/auth/reset_password
router.put("/reset_password", async (req, res) => {
    if (!req.body.resetPassword || !req.body.retypePassword) {
        return res.status(201).json({
            "success": false,
            "message": "Please Fill all the Fields"
        });
    }

    try {

        const rootUser = await User.findOne({
            _id: req.body.userId
        });

        if (!rootUser) {
            return res.status(401).json({
                "success": false,
                "message": "User Not Found For Password Reset"
            })
        }

        if (req.body.resetPassword === req.body.retypePassword) {
            const updateUser = await User.findByIdAndUpdate(req.body.userId,
                {
                    password: CryptoJS.AES.encrypt(req.body.resetPassword, process.env.AES_SEC_KEY).toString()
                }, { new: true }
            );


            res.status(200).json({
                "success": true,
                "message": "Password Reset Successful"
            });
            return;

        } else {
            res.status(201).json({
                "success": false, "message": "Both Value Must be Same"
            });
            return;
        }

    } catch (e) {
        // console.log(e)
        res.status(500).json({
            "success": false,
            "message": "Password Reset Failed",
        });
    }
})

// Find => /api/auth/find
router.get("/find", Verify, async (req, res) => {
    // console.log(req.rootUser);
    res.status(200).json({
        "success": true,
        rootUser: req.rootUser
    });
})


// Logout => /api/auth/logout
router.get("/logout", async (req, res) => {
    res.cookie('cryptowall', '', { maxAge: 0, httpOnly: true });

    res.status(201).json({
        "success": true,
        "message": "Logout Successfull"
    })
})


module.exports = router;