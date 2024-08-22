
const QRCode = require('qrcode');
const ticketModel = require('../model/ticket');
const eventModel = require('../model/event');
const userModel = require('../model/user');


const bookTicket = async (req, res) => {
    try {
        const event = await eventModel.findById(req.body.event);
        const user = await userModel.findById(req.body.user);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const qrCode = await QRCode.toDataURL(`Ticket for ${event.title} by ${user.name}`);

        const ticket = await ticketModel.create({
            event: req.body.event,
            user: req.body.user,
            qrCode: qrCode,
            status: 'Booked'
        });

        res.status(201).json(ticket);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const getTickets = async (req, res) => {
  try {
    const tickets = await ticketModel.find().populate('event', 'title date location');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTicketById = async (req, res) => {
    
}

module.exports = { bookTicket, getTickets };