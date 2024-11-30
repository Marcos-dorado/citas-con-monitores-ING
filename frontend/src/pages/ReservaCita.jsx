// src/pages/ReservarCita.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { validarHorarioCita } from "../utils/validacionesCita";
import AppLayout from "../layouts/AppLayout";
import SidebarLayout from "../layouts/SidebarLayout";

export default function ReservarCita() {
  const [monitorSeleccionado, setMonitorSeleccionado] = useState("");
  const [monitores, setMonitores] = useState([]);
  const [citaConfirmada, setCitaConfirmada] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetchMonitores = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/monitores");
        setMonitores(response.data);
      } catch (error) {
        setMensajeError("Error al cargar los monitores. Por favor, recarga la página.");
      }
    };
    fetchMonitores();
  }, []);

  const validarFormulario = () => {
    if (!monitorSeleccionado) {
      setMensajeError("Por favor, selecciona un monitor.");
      return false;
    }
    if (!fechaSeleccionada) {
      setMensajeError("Por favor, selecciona una fecha.");
      return false;
    }
    if (!horaSeleccionada) {
      setMensajeError("Por favor, selecciona una hora.");
      return false;
    }
    return true;
  };

  const manejarReserva = async () => {
    try {
      setMensajeError("");
      setCargando(true);

      // Validar formulario
      if (!validarFormulario()) {
        setCargando(false);
        return;
      }

      // Validar horario
      validarHorarioCita(fechaSeleccionada, horaSeleccionada);

      // Realizar la solicitud para guardar la cita
      const response = await axios.post("http://localhost:5000/api/citas", {
        fecha: fechaSeleccionada,
        hora: horaSeleccionada,
        monitor: monitorSeleccionado,
      });

      setCitaConfirmada(true);
      alert(`Cita reservada con éxito para el ${fechaSeleccionada} a las ${horaSeleccionada}`);

      // Limpiar formulario
      setMonitorSeleccionado("");
      setFechaSeleccionada("");
      setHoraSeleccionada("");

    } catch (error) {
      const mensajeError = error.response?.data?.error || error.message || "Error al reservar la cita";
      setMensajeError(mensajeError);
      setCitaConfirmada(false);
    } finally {
      setCargando(false);
    }
  };

  // Obtener fecha mínima (hoy) y máxima (3 meses adelante)
  const fechaMinima = new Date().toISOString().split('T')[0];
  const fechaMaxima = new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0];

  return (
    <AppLayout>
      <SidebarLayout>
        <div className="p-4 max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-6">Reservar Cita</h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monitor:
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                value={monitorSeleccionado}
                onChange={(e) => setMonitorSeleccionado(e.target.value)}
                disabled={cargando}
              >
                <option value="">Selecciona un monitor</option>
                {monitores.map((monitor) => (
                  <option key={monitor._id} value={monitor.nombre}>
                    {monitor.nombre} - {monitor.especialidad}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha:
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                min={fechaMinima}
                max={fechaMaxima}
                value={fechaSeleccionada}
                onChange={(e) => setFechaSeleccionada(e.target.value)}
                disabled={cargando}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hora:
              </label>
              <input
                type="time"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                min="08:00"
                max="18:00"
                step="1800" // Intervalos de 30 minutos
                value={horaSeleccionada}
                onChange={(e) => setHoraSeleccionada(e.target.value)}
                disabled={cargando}
              />
            </div>

            {mensajeError && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {mensajeError}
              </div>
            )}

            {citaConfirmada && (
              <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                Cita reservada con éxito.
              </div>
            )}

            <button
              onClick={manejarReserva}
              disabled={cargando}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                cargando ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {cargando ? 'Reservando...' : 'Reservar Cita'}
            </button>
          </div>
        </div>
      </SidebarLayout>
    </AppLayout>
  );
}