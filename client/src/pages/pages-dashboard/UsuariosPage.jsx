import React, { useState, useEffect } from 'react';
import { createClienteRequest, updateClienteRequest, deleteClienteRequest, getClientesRequest } from '../../api/cliente.js';
import Tabla from '../../components/ui/Tabla';
import Botones from '../../components/ui/Botones';
import InputText from '../../components/ui/InputText';
import { clienteSchema } from "../../schemas/cliente.js";

export default function UsuariosPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    codigo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async () => {
  try {
    clienteSchema.parse(formData); // Valida los datos con clienteSchema
    await createClienteRequest(formData);
    setFormData({
      nombre: '',
      apellido: '',
      direccion: '',
      codigo: ''
    });
  } catch (error) {
    if (error instanceof ZodError) {
      alert('Error de validación: ' + error.errors.map(e => e.message).join(', '));
    } else {
      alert('Error al crear el cliente: ' + (error.response?.data?.message || error.message));
    }
  }
};

const handleUpdate = async () => {
  try {
    const filteredData = Object.entries(formData)
      .filter(([_, value]) => value !== '')
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    if (Object.keys(filteredData).length === 0) {
      alert('No hay datos para actualizar');
      return;
    }

    clienteSchema.partial().parse(filteredData); // Valida campos parciales con clienteSchema
    await updateClienteRequest(formData.codigo, filteredData);
    setFormData({ nombre: '', apellido: '', direccion: '', codigo: '' });
  } catch (error) {
    if (error instanceof ZodError) {
      alert('Error de validación: ' + error.errors.map(e => e.message).join(', '));
    } else {
      alert('Error al actualizar el cliente: ' + (error.response?.data?.message || error.message));
    }
  }
};

const handleDelete = async () => {
  try {
    clienteSchema.pick({ codigo: true }).parse(formData); // Valida solo el campo "codigo"
    await deleteClienteRequest(formData.codigo);
    setFormData({ nombre: '', apellido: '', direccion: '', codigo: '' });
  } catch (error) {
    if (error instanceof ZodError) {
      alert('Error de validación: ' + error.errors.map(e => e.message).join(', '));
    } else {
      alert('Error al eliminar el cliente: ' + (error.response?.data?.message || error.message));
    }
  }
};

const [clientes, setClientes] = useState([]);
const handleTodo = async () => {
  try {
    const response = await getClientesRequest();
    const clientesData = response.data.map((cliente) => ({
      id: cliente.codigo,
      col1: cliente.nombre,
      col2: cliente.apellido,
      col3: cliente.direccion,
    }));

    setClientes(clientesData);
    setFormData({ nombre: '', apellido: '', direccion: '', codigo: '' });
  } catch (error) {
    alert('Error al cargar los clientes: ' + (error.response?.data?.message || error.message));
  }
};
  
  useEffect(() => {
    handleTodo();  
  }, []);

  const handleUpdateWithFetch = async () => {
    await handleUpdate(); 
    await handleTodo();   
  };
  
  const handleAddWithFetch = async () => {
    await handleSubmit(); 
    await handleTodo();   
  };
  
  const handleDeleteWithFetch = async () => {
    await handleDelete(); 
    await handleTodo();   
  };
  
  

  return (
    <>
     <InputText
  atr1="Nombre"
  name1="nombre"
  value1={formData.nombre}
  onChange1={handleChange}
  atr2="Apellido"
  name2="apellido"
  value2={formData.apellido}
  onChange2={handleChange}
  atr3="Dirección"
  name3="direccion"
  value3={formData.direccion}
  onChange3={handleChange}
  atr4="Código"
  name4="codigo"
  value4={formData.codigo}
  onChange4={handleChange}
/>

      <br />
      <Botones
        onUpdate={handleUpdateWithFetch}
        onAdd={handleAddWithFetch}
        onDelete={handleDeleteWithFetch}
      />

      <br />
      <Tabla 
      col1="Nombre" 
      col2="Apellido" 
      col3="Direccion" 
      rows={clientes} 
    />
    </>
  );
}
