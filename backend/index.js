require("dotenv").config();
const express = require("express");
const connectDb = require("./db");
const authRoute = require("./routes/auth-route");
const placeRoute = require("./routes/place-route");
const travelUserRoute = require("./routes/travelUser-route");
const adminRoute = require("./routes/admin-route");
const homeRoute = require("./routes/home-route");
var cors = require('cors');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../backend/models/User-model'); // Adjust the extension based on your file type
// const Place = require('../backend/models/User-model');
const shortid = require("shortid");
const Razorpay = require("razorpay");

const app = express();
app.use(cors())
const PORT = 5000;
app.use(express.json());

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});



passport.use(new GoogleStrategy({
    clientID: "773695330225-rj3orcufnett9df8hmenhkihptib1ogd.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/home",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessTocken, refeshTocken, profile, done) {
        console.log("Ruchir parmar");
        console.log(profile);
        User.findOne({ 'googleId': profile.id })
            .then(user => {
                if (!user) {
                    user = new User({
                        googleId: profile.id
                    });
                    user.save()
                        .then(() => done(null, user))
                        .catch(err => done(err));

                    //found user
                } else {
                    done(null, user);
                }
            })
            .catch(err => done(err));
    }
));

app.use(passport.initialize());


app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
);

app.get('/auth/google/home',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect("/home");
    });

async function createRazorpayOrder(amount) {
    const options = {
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        receipt: 'order_rcptid_11',
        payment_capture: 1 // Auto capture payment
    };

    try {
        const response = await razorpay.orders.create(options);
        return response;
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        throw error;
    }
}

// Assuming you're using Express.js
app.post('/api/payment', async (req, res) => {
    const { amount } = req.body;
    const payment_capture = 1;
    const currency = "INR";

    const options = {
        amount: amount * 100, // Amount should be in paisa
        currency,
        receipt: shortid.generate(), // Generate a unique receipt ID
        payment_capture,
    };

    try {
        const response = await razorpay.orders.create(options);
        console.log(response);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





app.use("/api/auth", authRoute);
app.use("/api/place", placeRoute);
app.use("/api/travelUser",travelUserRoute);
app.use("/api/admin",adminRoute);
app.use("/api/home",homeRoute);





connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    })
})
