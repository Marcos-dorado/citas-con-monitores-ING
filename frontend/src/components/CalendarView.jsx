// frontend/src/components/CalendarView.jsx
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getAvailableAppointments } from '../services/api';

const CalendarView = ({ onDateSelect }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAvailableAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      return appointments.some(appointment => {
        const appointmentDateStr = new Date(appointment.date).toISOString().split('T')[0];
        return appointmentDateStr === dateStr;
      });
    }
    return false;
  };

  return (
    <div className="flex justify-center items-center p-4 sm:p-6 lg:p-8">
      <Calendar
        className="border border-gray-300 rounded-lg shadow-sm w-full max-w-md"
        onClickDay={onDateSelect}
        tileDisabled={tileDisabled}
        tileContent={({ date, view }) => {
          if (view === 'month') {
            const dateStr = date.toISOString().split('T')[0];
            const hasAppointment = appointments.some(appointment => {
              const appointmentDateStr = new Date(appointment.date).toISOString().split('T')[0];
              return appointmentDateStr === dateStr;
            });
            return hasAppointment ? <div className="dot bg-red-500"></div> : null;
          }
        }}
      />
    </div>
  );
};

export default CalendarView;
