const mongoose = require("mongoose");


// const MongooseURI = "mongodb://0.0.0.0:27017/travel_plan_and_booking"
const URI = process.env.MONGOOSEURI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection successfull");
    } catch (error) {
        console.error("Database connection failed")
        process.exit(0);
    }
}

module.exports = connectDb;