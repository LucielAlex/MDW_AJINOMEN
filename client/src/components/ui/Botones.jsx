import React from 'react';
import { Stack, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Botones({ onUpdate, onAdd, onDelete }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button color="secondary" onClick={onUpdate}>Actualizar</Button>
      <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={onAdd}>
        Añadir
      </Button>
      <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={onDelete} >
        Eliminar
      </Button>
    </Stack>
  );
}
