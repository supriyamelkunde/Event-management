const mongoose = require("mongoose");

const eventSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    capacity:{
        type: Number,
        required: true
    },
    organizer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // another table name 
        required: true
    }


}, { timestamps: true });

const eventModel = mongoose.model("events", eventSchema);

module.exports = eventModel