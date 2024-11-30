// src/utils/validacionesCita.js
export const validarHorarioCita = (fecha, hora) => {
    // Crear fecha con la zona horaria local
    const fechaLocal = new Date(fecha + 'T' + hora);
    
    // Obtener las horas y minutos de la hora seleccionada
    const [horas, minutos] = hora.split(':');
    const horaNum = parseInt(horas) + parseInt(minutos) / 60;
    
    // Obtener el día de la semana (0-6, donde 0 es domingo)
    const diaSemana = fechaLocal.getDay();
  
    // Validar rango de hora general (8:00 AM a 6:00 PM)
    if (horaNum < 8 || horaNum > 18) {
      throw new Error('Las citas solo se pueden programar entre 8:00 AM y 6:00 PM');
    }
  
    // Validar domingo
    if (diaSemana === 0) {
      throw new Error('No se pueden programar citas en domingo');
    }
  
    // Validar sábado después de la 1:00 PM
    if (diaSemana === 6 && horaNum >= 13) {
      throw new Error('Los sábados solo se pueden programar citas hasta la 1:00 PM');
    }
  
    return true;
  };