// importing Modules
const router = require("express").Router();
const Verify = require("../Helper/Verify");
const User = require("../Models/User");
const CryptoJS = require("crypto-js");


router.put("/update", Verify, async (req, res) => {
    // console.log(req.body);
    if (!req.body.username || !req.body.email) {
        res.status(201).json({ "success": false, "message": "Please Fill Username and Email" });
        return;
    }

    if (!req.body.password && !req.body.newPassword && !req.body.rePassword && req.body.username && req.body.email) {
        try {
            const findUser = await User.findOne({ userId: req.userId });

            // console.log(req.body);
            if (!findUser) {
                res.status(401).json({
                    "success": false,
                    "message": "User Not Found"
                })
                return;
            } else {
                const updateUser = await User.findByIdAndUpdate(req.userId,
                    {
                        username: req.body.username,
                        email: req.body.email,
                        avatar: req.body.avatar
                    }, { new: true }
                );

                const { password, ...others } = updateUser._doc;

                res.status(200).json({ "success": true, ...others });

                return;
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({
                "success": false,
                "message": "Updation Failed"
            });
        }
    } else if (req.body.password && req.body.newPassword && req.body.rePassword && req.body.username && req.body.email) {
        try {
            const findUser = await User.findOne({ email: req.body.email });

            if (!findUser) {
                res.status(201).send({
                    "success": false,
                    "message": "User not Found"
                });
                return;
            } else {

                const decryptedPass = CryptoJS.AES.decrypt(
                    findUser.password,
                    process.env.AES_SEC_KEY
                ).toString(CryptoJS.enc.Utf8);

                if (decryptedPass !== req.body.password) {
                    res.status(201).json({
                        "success": false,
                        "message": "Incorrect Current Password"
                    });
                    return;
                }


                if (req.body.newPassword === req.body.rePassword) {
                    const updateUser = await User.findByIdAndUpdate(req.userId,
                        {
                            username: req.body.username,
                            email: req.body.email,
                            avatar: req.body.avatar,
                            password: CryptoJS.AES.encrypt(req.body.newPassword, process.env.AES_SEC_KEY).toString()
                        }, { new: true }
                    );

                    const { password, ...others } = updateUser._doc;

                    res.status(200).json({ "success": true, ...others });
                    return;

                } else {
                    res.status(201).json({ "success": false, "message": "Password and re-Enter Password Must be Same" });
                    return;
                }



            }

        } catch (e) {

        }
    } else {
        res.status(201).json({ "success": false, "message": "Please Fill all the Fields" });
        return;
    }
})

router.get("/find", Verify, async (req, res) => {
    try {

        const findFav = await Favourites.findOne({ userId: req.userId });

        if (findFav) {
            res.status(201).json({
                "success": true,
                coinList: findFav.coinList,
                rootUser: req.rootUser._doc
            })
        } else {
            res.status(201).json({
                "success": true,
                rootUser: req.rootUser._doc
            })
        }


    } catch (e) {
        res.status(500).json({
            "success": false,
            "message": "Internal Server Error"
        })
    }
})

module.exports = router;