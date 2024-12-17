import React from "react";
import "./SpecialistDashboard.css";

const appointments = [
  {
    id: 1,
    name: "John Doe",
    phone: "123-456-7890",
    reason: "Facial Treatment",
    appointmentDate: "2024-12-20",
    appointmentTime: "10:00 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "987-654-3210",
    reason: "Botox Treatment",
    appointmentDate: "2024-12-21",
    appointmentTime: "2:00 PM",
  },
];

function SpecialistDashboard() {
  return (
    <div className="specialist-dashboard">
      <h1>Upcoming Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Phone</th>
            <th>Reason</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.name}</td>
              <td>{appointment.phone}</td>
              <td>{appointment.reason}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.appointmentTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SpecialistDashboard;
