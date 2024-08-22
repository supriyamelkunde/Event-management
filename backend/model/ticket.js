const mongoose = require("mongoose");

const ticketSchema= new mongoose.Schema({
    event:{
        type: mongoose.Schema.Types.ObjectId, //reference to another "event" collection.
        ref: 'events',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', //reference to another "users" collection.
        required: true
    },
    qrCode: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum : ['Booked', 'Check-in'],
        default : 'Booked'
    }
}, { timestamps: true });

const ticketModel = mongoose.model('tickets', ticketSchema);

module.exports = ticketModel;