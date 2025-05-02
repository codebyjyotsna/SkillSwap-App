const mongoose = require("mongoose");

const BadgeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  icon: { type: String }, // URL or icon class
  criteria: { type: String, required: true }, // Example: "5 lessons completed"
});

module.exports = mongoose.model("Badge", BadgeSchema);
