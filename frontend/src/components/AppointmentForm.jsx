// // frontend/src/components/AppointmentForm.jsx
// import React, { useState } from 'react';
// import { createAppointment } from '../services/api';

// const AppointmentForm = ({ selectedDate }) => {
//   const [studentId, setStudentId] = useState('');
//   const [monitorId, setMonitorId] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const appointmentData = {
//       studentId,
//       monitorId,
//       date: selectedDate,
//     };
//     await createAppointment(appointmentData);
//     alert('Cita creada exitosamente');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <label className="block">
//         <span className="text-gray-700">ID del Estudiante:</span>
//         <input
//           type="text"
//           value={studentId}
//           onChange={(e) => setStudentId(e.target.value)}
//           required
//           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         />
//       </label>
//       <label className="block">
//         <span className="text-gray-700">ID del Monitor:</span>
//         <input
//           type="text"
//           value={monitorId}
//           onChange={(e) => setMonitorId(e.target.value)}
//           required
//           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         />
//       </label>
//       <button
//         type="submit"
//         className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         Reservar Cita
//       </button>
//     </form>
//   );
// };

// export default AppointmentForm;
