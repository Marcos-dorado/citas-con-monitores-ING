import React, { useEffect, useState } from "react";
import axios from "axios";
import AppLayout from "../layouts/AppLayout";
import SidebarLayout from "../layouts/SidebarLayout";

export default function Monitores() {
  const [monitores, setMonitores] = useState([]);

  useEffect(() => {
    const fetchMonitores = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/monitores");
        setMonitores(response.data);
        console.log("Monitores recibidos:", response.data); 
      } catch (error) {
        console.error("Error al obtener los monitores", error);
      }
    };
  
    fetchMonitores();
  }, []);
  

  return (
    <AppLayout>
      <SidebarLayout>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Monitores Disponibles</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {monitores.map((monitor) => (
              <div key={monitor._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={monitor.foto || "https://via.placeholder.com/150"}
                  alt={monitor.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{monitor.nombre}</h2>
                  <p className="text-gray-600">{monitor.especialidad}</p>
                  {/* Aquí puedes agregar más detalles si lo deseas */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SidebarLayout>
    </AppLayout>
  );
}
