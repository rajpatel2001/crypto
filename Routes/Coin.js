// importing Modules
const router = require("express").Router();
const Verify = require("../Helper/Verify");
const Favourites = require("../Models/Favourites");


router.post("/add", Verify, async (req, res) => {
    try {
        const findFav = await Favourites.findOne({ userId: req.userId });


        console.log(req.body);
        if (!findFav) {
            const newFav = await Favourites.create({
                userId: req.userId,
                coinList: req.body.coinList
            })
            res.status(201).json({
                "success": true,
                "message": "Coin Added to Favourite"
            })
            return;

        } else {
            await Favourites.findOneAndDelete(
                { userId: req.userId }
            );

            const newFav = await Favourites.create({
                userId: req.userId,
                coinList: req.body.coinList
            })

            res.status(201).json({
                "success": true,
                "message": "Coin Added to Favourite"
            })
            return;
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            "success": false,
            "message": "Coin Adding Failed"
        });
    }
})

router.get("/find", Verify, async (req, res) => {
    try {

        const findFav = await Favourites.findOne({ userId: req.userId });

        if (findFav) {
            res.status(201).json({
                "success": true,
                coinList: findFav.coinList,
                rootUser: req.rootUser
            })
        } else {
            res.status(201).json({
                "success": true,
                rootUser: req.rootUser
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