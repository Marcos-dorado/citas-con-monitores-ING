import { Routes, Route } from "react-router-dom";
// import HomePage from "../pages/HomePage";
import Monitores from "../pages/Monitores";
import ReservaCita from "../pages/ReservaCita";
import Calendario from "../pages/Calendario";


export default function Allroutes() {

  return (
    <Routes>
            <Route path="/" element={<Calendario />} /> {/* Ruta raíz */}
            <Route path="/calendario" element={<Calendario/>} />
            <Route path="/monitores" element={<Monitores />} />
            <Route path="/reserva-cita" element={<ReservaCita />} />
    </Routes>
    
  )
  
}
