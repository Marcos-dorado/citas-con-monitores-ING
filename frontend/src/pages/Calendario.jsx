import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"; // Asegúrate de tener este plugin
import interactionPlugin from "@fullcalendar/interaction"; // Asegúrate de tener este plugin también
import axios from "axios";
import AppLayout from "../layouts/AppLayout";
import SidebarLayout from "../layouts/SidebarLayout";
import ModalCita from "../components/ModalCita";
import Chatbot from "../components/Chatbot";
import moment from "moment-timezone"; 
import "../styles/Calendario.css";

export default function Calendario() {
  const [citas, setCitas] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  useEffect(() => {
    const obtenerCitas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/citas");
        console.log("Citas obtenidas:", response.data);
        if (Array.isArray(response.data)) {
          setCitas(response.data);
        }
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    };
    obtenerCitas();
  }, []);

  const eventos = citas
    .map((cita) => {
      try {
        const fechaCompleta = moment.tz(cita.fecha, "America/Bogota");
        if (!fechaCompleta.isValid()) {
          console.error("Fecha inválida:", cita);
          return null;
        }

        const fechaInicio = fechaCompleta.startOf("day").toISOString();
        const fechaFin = fechaCompleta.endOf("day").toISOString();

        return {
          id: cita._id,
          title: `Cita con ${cita.monitor}`, // Corrección aquí
          start: fechaInicio,
          end: fechaFin,
          allDay: true,
          extendedProps: {
            monitor: cita.monitor,
            detalles: cita.detalles,
            hora: cita.hora,
          },
        };
      } catch (error) {
        console.error("Error al procesar cita:", error, cita);
        return null;
      }
    })
    .filter(Boolean);

  const abrirModal = (cita) => {
    console.log("Cita seleccionada para modal:", cita);
    setCitaSeleccionada(cita);
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
    setCitaSeleccionada(null);
  };

  return (
    <AppLayout>
      <SidebarLayout>
        <div className="p-4">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Asegúrate de incluir los tres plugins
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay", // Asegúrate de que las vistas estén correctamente configuradas
            }}
            events={eventos}
            eventClick={(info) => {
              const citaSeleccionada = citas.find(
                (cita) => cita._id === info.event.id
              );
              if (citaSeleccionada) {
                abrirModal(citaSeleccionada);
              }
            }}
            locale="es"
            nowIndicator={true}
            eventDisplay="block"
            eventBackgroundColor="#3788d8"
            eventBorderColor="#2c6cb0"
            eventTextColor="white"
            height="auto"
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5, 6],
              startTime: "08:00",
              endTime: "18:00",
            }}
          />
        </div>
        <ModalCita
          isOpen={modalIsOpen}
          onClose={cerrarModal}
          cita={citaSeleccionada}
        />
        <Chatbot />
      </SidebarLayout>
    </AppLayout>
  );
}
