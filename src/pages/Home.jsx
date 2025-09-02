
import {QRCodeCanvas,QRCodeSVG} from 'qrcode.react';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import Images from '../assets/imagenes';

const Home = () => {
 
    const dataToEncode = JSON.stringify({ nombre: 'Billy Hirthe', id: 6 });
    const displaySize = 200; // Tamaño del QR en pantalla (200x200 píxeles)
    const exportSize = 580;  // Tamaño deseado para la exportación 
    const qrRef = useRef(null); // Referencia al contenedor del QR
    const exportScaleFactor = exportSize / displaySize;

    const exportQrAsImage = async () => {
        if (qrRef.current) {
        const canvas = await html2canvas(qrRef.current, {
            backgroundColor: '#FFFFFF', // Fondo blanco para la imagen exportada
            scale: exportScaleFactor,   // ¡Aplicamos el factor de escala calculado!
            logging: false,             // Deshabilita logs de html2canvas en consola (opcional)
            useCORS: true               // Importante si usas imágenes de origen cruzado en el QR
        });

        // Crea un enlace temporal para la descarga
        const image = canvas.toDataURL('image/png'); // Puedes cambiar a 'image/jpeg'
        const link = document.createElement('a');
        link.href = image;
        link.download = 'mi_codigo_qr_personalizado6.png'; // Nombre del archivo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        }
    };


  return (
    <div>
    {//*@yudiel/react-qr-scanner leer codigos qr(revisar)
    }
        <div>Home</div>
        <div
            ref={qrRef} 
            style={{ 
            display: 'inline-block', 
            backgroundColor: '#FFFFFF', // Fondo blanco para el QR
            padding: '20px', // Añade un padding alrededor del QR, si deseas un "marco" extra
            borderRadius: '8px', // Bordes ligeramente redondeados
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Sombra sutil
        }}>
            <QRCodeCanvas
            value={dataToEncode}
            size={displaySize}
            level="H" // Nivel de corrección de errores, 'H' es bueno para logos
            // Puedes personalizar los colores si lo necesitas, aunque el negro y blanco es estándar
            // fgColor="#000000" // Color de los módulos (negro)
            // bgColor="#FFFFFF" // Color de fondo (blanco)
            //*al parecer sin la imagen se escanea mas rapido
             imageSettings={{
                //src: '/crashp.png',
                src: Images.crashp,
                x: undefined,
                y: undefined,
                height: 50,
                width: 50,
                excavate: true, // Esto crea un espacio en blanco detrás de la imagen
            }}
            
            />
        </div>
        <div>
             <button
        onClick={exportQrAsImage}
        style={{
          marginTop: '30px',
          padding: '12px 25px',
          fontSize: '1em',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        Descargar QR ({exportSize}x{exportSize} PNG)
      </button>
        </div>
    </div>
  )
}
export default Home