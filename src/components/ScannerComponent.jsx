import { useState, useEffect } from 'react';
import { Scanner, useDevices } from '@yudiel/react-qr-scanner';
function ScannerComponent({onScann}) {
    const [scannedResult, setScannedResult] = useState('');
    const [deviceId, setDeviceId] = useState(undefined);
    const [isScanningPaused, setIsScanningPaused] = useState(false);
    const devices = useDevices(); // Hook para obtener la lista de dispositivos de cámara

    const handleScan = (result) => {
        if (result) {
            console.log(result)
            //setScannedResult(result[0].rawValue);
            console.log('Código QR escaneado:', result[0].rawValue);
            const data=JSON.parse(result[0].rawValue)
            console.log(data)
            setIsScanningPaused(true); // Pausar el escaneo después de un resultado
            onScann(data);
        }
    };

    const handleError = (err) => {
        console.error('Error al escanear:', err);
        // Puedes mostrar un mensaje al usuario si la cámara no está disponible, etc.
    };

    const handleDeviceChange = (event) => {
        setDeviceId(event.target.value);
    };

    const resumeScanning = () => {
        setIsScanningPaused(false);
        setScannedResult(''); // Limpiar el resultado anterior
    };


    return (
        <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <div className="row">
                <div className="col mb-4">
                    <label htmlFor="camera-select" style={{ marginRight: '10px',marginBottom: '10px' }}>Seleccionar Cámara:</label>
                    <select id="camera-select" onChange={handleDeviceChange} value={deviceId || ''}>
                    <option value="">Cámara por defecto</option>
                    {devices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `Cámara ${device.kind}`}
                        </option>
                    ))}
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {isScanningPaused ? (
                        <div>
                            <p>Resultado del escaneo: <strong>{scannedResult}</strong></p>
                            <button onClick={resumeScanning} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                Escanear de Nuevo
                            </button>
                        </div>
                    ) : (
                        <div style={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden', backgroundColor: 'black' }}>
                            <Scanner
                                onScan={handleScan}
                                onError={handleError}
                                constraints={{ deviceId: deviceId ? { exact: deviceId } : undefined }}
                                formats={['qr_code']} // Solo escanear códigos QR
                                paused={isScanningPaused}
                                scanDelay={500}
                                // Puedes añadir estilos para el video si es necesario
                                styles={{
                                container: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
                                video: { width: '100%', height: '100%', objectFit: 'cover' }
                                }}
                            />
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
export default ScannerComponent