const mongoose = require ("mongoose");

const url = "mongodb://127.0.0.1:27017/eventManagement"

const dbConnect = async (req,res)=>{
    mongoose.connect(url);
    console.log("Mongodb Connected")

}

module.exports = dbConnect;
