
// components/ModalCita.jsx
import React from "react";
import Modal from "react-modal";
import "../styles/ModalCita.css";

Modal.setAppElement("#root");

// Función para mostrar la fecha y hora sin cambios en la zona horaria
const convertirFechaHora = (fecha, hora) => {
  if (!fecha || !hora) return null;

  // Crear un objeto Date con la fecha y la hora proporcionada
  const fechaCompleta = new Date(fecha + "T" + hora); // Usamos la fecha y hora combinadas

  // Formateamos la fecha para mostrarla de forma legible (sin modificar la zona horaria)
  const fechaFormateada = fechaCompleta.toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Formateamos la hora de manera correcta
  const horaFormateada = fechaCompleta.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${fechaFormateada} a las ${horaFormateada}`;
};

export default function ModalCita({ isOpen, onClose, cita }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-lg mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{
        content: {
          zIndex: 9999,
        },
      }}
    >
      {cita && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Cita con {cita.monitor}
          </h2>
          <div className="text-gray-700 text-center mb-6 space-y-2">
            {/* Llamamos a la función para mostrar la fecha y hora correctamente */}
            <p><strong>Fecha y Hora:</strong> {convertirFechaHora(cita.fecha, cita.hora)}</p>
            <p><strong>Detalles adicionales:</strong> {cita.detalles || "No hay detalles adicionales."}</p>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 transition"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
