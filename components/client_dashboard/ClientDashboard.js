import React, { useState } from "react";
import "./ClientDashboard.css";

function ClientDashboard() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    medicalHistory: "",
    allergies: "",
    reason: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Appointment Scheduled Successfully!");
  };

  return (
    <div className="client-dashboard">
      <h1>Client Dashboard</h1>
      <form onSubmit={handleSubmit} className="client-form">
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Medical History:</label>
        <textarea
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          rows="3"
        ></textarea>

        <label>Allergies:</label>
        <input
          type="text"
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
        />

        <label>Reason for Appointment:</label>
        <input
          type="text"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
        />

        <label>Appointment Date:</label>
        <input
          type="date"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          required
        />

        <label>Appointment Time:</label>
        <input
          type="time"
          name="appointmentTime"
          value={formData.appointmentTime}
          onChange={handleChange}
          required
        />

        <button type="submit">Schedule Appointment</button>
      </form>
    </div>
  );
}

export default ClientDashboard;
