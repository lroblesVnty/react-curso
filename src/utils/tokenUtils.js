
/**
 * Comprueba si una fecha de expiración dada ha pasado.
 * @param {string} expiresAtString La fecha y hora de expiración del token (ej. "2025-05-30 10:30:00").
 * @returns {boolean} True si el token ha expirado, false en caso contrario.
 */
export function isTokenExpired(expiresAtString) {
    // Si no se proporciona una fecha de expiración, asumimos que no es válido.
    // Esto puede ocurrir si el token está ausente o si el valor es nulo/vacío.
    if (!expiresAtString) {
        console.warn("isTokenExpired: No se proporcionó una fecha de expiración.");
        return true;
    }

    try {
        // Convertimos la cadena de fecha de expiración a un objeto Date
        // Date.parse() es bastante robusto con formatos como "YYYY-MM-DD HH:MM:SS"
        const expirationDate = new Date(expiresAtString);

        // Obtenemos la fecha y hora actuales
        const now = new Date();

        // Comparamos si la fecha de expiración es anterior a la fecha actual
        // Si expirationDate < now, significa que ya ha pasado
        return expirationDate < now;
    } catch (e) {
        console.error("isTokenExpired: Error al parsear la fecha de expiración:", e);
        // Si hay un error al parsear la fecha, consideramos el token como expirado
        return true;
    }
}