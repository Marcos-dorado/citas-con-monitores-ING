// import React, { useState } from 'react';
// import CalendarView from '../components/CalendarView';
// import AppointmentForm from '../components/AppointmentForm';
// import AppLayout from '../layouts/AppLayout';
// import SidebarLayout from '../layouts/SidebarLayout';

// const HomePage = () => {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateSelect = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <AppLayout>
//         <SidebarLayout>
//             <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
//             <h1 className="text-3xl font-bold text-blue-700 mb-6">Gestión de Citas de Asesoría</h1>
//             <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
//                 <CalendarView onDateSelect={handleDateSelect} />
//             </div>
//             {selectedDate && (
//                 <div className="w-full max-w-md bg-white p-6 mt-6 rounded-lg shadow-md">
//                 <h2 className="text-lg font-semibold text-gray-700 mb-4">
//                     Reservar cita para {selectedDate.toDateString()}
//                 </h2>
//                 <AppointmentForm selectedDate={selectedDate} />
//                 </div>
//             )}
//             </div>
//         </SidebarLayout>
//     </AppLayout>
//   );
// };

// export default HomePage;
