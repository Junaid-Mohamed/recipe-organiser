const mongoose = require("mongoose");
require("dotenv").config();

const mongodb_url = process.env.MONGODB_URL;

const initalizeDB = async() => {
    try{
        await mongoose.connect(mongodb_url,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connection to database successfull.")
    }catch(error){
        console.log(`Error initializing db`,error);
    }
}

module.exports = initalizeDB;