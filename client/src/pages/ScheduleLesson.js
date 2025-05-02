import React, { useState } from "react";
import axios from "axios";

function ScheduleLesson() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const scheduleLesson = async (e) => {
    e.preventDefault();
    const eventDetails = {
      summary: title,
      start: { dateTime: new Date(`${date}T${time}:00Z`).toISOString() },
      end: { dateTime: new Date(`${date}T${time + 1}:00Z`).toISOString() },
    };
    try {
      await axios.post("http://localhost:5000/api/calendar/create", eventDetails);
      alert("Lesson scheduled successfully!");
    } catch (err) {
      console.error("Error scheduling lesson:", err);
    }
  };

  return (
    <form onSubmit={scheduleLesson}>
      <label>Lesson Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <label>Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <label>Time:</label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <button type="submit">Schedule Lesson</button>
    </form>
  );
}

export default ScheduleLesson;
