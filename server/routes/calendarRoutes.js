const express = require("express");
const { createEvent } = require("../utils/googleCalendar");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const eventDetails = req.body;
    const event = await createEvent(eventDetails);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
