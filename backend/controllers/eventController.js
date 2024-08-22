// Import the event model
const eventModel = require("../model/event");

// Controller to create a new event
// Adds the current user as the organizer and saves the event to the database
const createEvent = async (req, res) => {
  try {
    const event = await eventModel.create({...req.body, organizer: req.user.id});
    res.status(201).json(event);
    console.log("Event created:", event);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(400).json(error);
  }
};

// Controller to retrieve all events
// Fetches all events from the database and includes organizer details
const getEvents = async (req, res) => {
  try {
    const events = await eventModel.find().populate("organizer", "name email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to retrieve a specific event by ID
// Fetches an event based on its ID and includes organizer details
const getEventById = async (req, res) => {
  try {
    // Populate is used to replace the 'organizer' ID with actual user details (name and email)
    const event = await eventModel
      .findById(req.params.id)
      .populate("organizer", "name email");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to update an existing event by ID
// Updates event details based on provided data and returns the updated event
const updateEvent = async (req, res) => {
  try {
    // { new: true } ensures that the updated document is returned instead of the original one
    const event = await eventModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete an event by ID
// Removes the specified event from the database
const deleteEvent = async (req, res) => {
  try {
    const event = await eventModel.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export the controllers to be used in routes
module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
