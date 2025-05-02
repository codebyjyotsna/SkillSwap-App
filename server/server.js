const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIO = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require("./routes/skillRoutes");
const chatRoutes = require("./routes/chatRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const calendarRoutes = require("./routes/calendarRoutes");

app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/calendar", calendarRoutes);

// Real-time Chat with Socket.IO
io.on("connection", (socket) => {
  console.log("New client connected");

  // Listen for messages
  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message); // Broadcast message to all connected clients
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Server Listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
