const express = require("express");
const { bookTicket, getTickets } = require("../controllers/ticketController");
const routes = express.Router();

routes.post("/ticket", bookTicket);
routes.get("/ticket", getTickets);

module.exports = routes