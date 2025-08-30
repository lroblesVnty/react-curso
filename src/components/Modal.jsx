import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';

const ModalComponent = ({open,handleClose,children,width=550}) => {
    const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: width,
  bgcolor: 'background.paper',
   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  // --- ¡Añade esta línea para redondear las esquinas! ---
  borderRadius: '8px', // Puedes ajustar este valor (por ejemplo, '4px', '16px', '50%')
  maxHeight: '90vh',
};


  return (
    <Modal
        open={open}
        //onClose={handleClose}
         onClose={() => { /* No hacemos nada con el onClose del Modal directamente si no queremos que se cierre */ }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEscapeKeyDown={true}
        slotProps={{
            backdrop: {
            invisible: false, // Asegura que el backdrop sea visible
            onClick: (event) => {
                console.log('cliiiic')
                // Puedes agregar lógica aquí si lo necesitas,
                // pero si no quieres que cierre, simplemente no llamas a onClose.
                event.stopPropagation(); // Opcional: Evita que el clic se propague si es necesario
            },
            // Puedes usar 'open' o 'onClose' directamente aquí si tu `onClose` es solo para cerrar
            // pero si tu onClose tiene mas logica, esta es la forma mas limpia.
            },
        }}

      >
       <Box sx={style}>
        {children}
       </Box>
          
      </Modal>
  )
}
export default ModalComponent