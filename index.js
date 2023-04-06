//Modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");


//Requiring Routes
const authRoute = require("./Routes/Auth");
const coinRoute = require("./Routes/Coin");
const userRoute = require("./Routes/User");

//Configuring Modules
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000'],
    methods: ["GET", "PUT", "POST", "DELETE"],
}))
app.use(cookieParser())

const port = process.env.PORT || 5000;

//connecting with Database
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connection with DB Successful"))
    .catch((err) => console.log("Connection with DB failed " + err));

//End Points
app.use("/api/auth", authRoute);
app.use("/api/coin", coinRoute);
app.use("/api/user", userRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

//Rajpatel2408