const express = require("express");
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require("../controllers/eventController");
const authenticate = require("../middleware/authMiddleware");
const routes = express.Router();

routes.post("/events", authenticate, createEvent);
routes.get("/events",  getEvents);
routes.get("/events/:id",  getEventById); //localhost:5500/api/event/events/66c5ba82d97f3789a598e073
routes.put("/events/:id", authenticate, updateEvent); //localhost:5500/api/event/events/66c5ba82d97f3789a598e073
routes.delete("/events/:id", authenticate, deleteEvent); //localhost:5500/api/event/events/66c5ba82d97f3789a598e073

module.exports = routes