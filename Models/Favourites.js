const mongoose = require("mongoose");

const FavouriteSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true
        },
        coinList: {
            type: Array,
        }
    }, { timestamps: true }
)

module.exports = mongoose.model("Favourites", FavouriteSchema);