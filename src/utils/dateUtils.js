export const splitDateTime = (dateTime) => {
    if (!dateTime) return { date: '', time: '' };

        // 1. Separar la fecha y la hora
    let [date, time] = dateTime.split('T');

    // 2. Separar la fecha en sus componentes (año, mes, día)
    const [year, month, day] = date.split('-');

    // 3. Reorganizar los componentes al formato 'dd-mm-yyyy'
    date = `${day}-${month}-${year}`;
   

    return {
        fecha: date, // Por ejemplo: '24-08-2025'
        hora: time,      // Por ejemplo: '18:53'
    };
};


export const isThreeDaysBefore = (targetDateStr) => {
    const today = new Date();
    const targetDate = new Date(targetDateStr);

    // Normalizamos fechas sin horas
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffInMs = targetDate - today;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays === 3;
};

