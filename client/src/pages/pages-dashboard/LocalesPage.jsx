import React, { useState, useEffect } from 'react';
import { createLocalRequest, updateLocalRequest, deleteLocalRequest, getLocalesRequest } from '../../api/local.js';
import Tabla from '../../components/ui/Tabla';
import Botones from '../../components/ui/Botones';
import InputText from '../../components/ui/InputText';
import { localSchema } from "../../schemas/local.js";

export default function LocalesPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    distrito: '',
    telefono: '',
    codigo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      localSchema.parse(formData); 
      await createLocalRequest(formData);
      setFormData({
        nombre: '',
        distrito: '',
        telefono: '',
        codigo: ''
      });
    } catch (error) {
      alert('Error al guardar el local: ' + error.response?.data?.message || error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      // Filtra los campos no vacíos
      const filteredData = Object.entries(formData)
      .filter(([_, value]) => value !== '') 
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

      // Verifica si hay al menos un campo a actualizar
      if (Object.keys(filteredData).length === 0) {
      alert('No hay datos para actualizar');
      return;
      }

      localSchema.partial().parse(filteredData);
      await updateLocalRequest(formData.codigo, filteredData);
      setFormData({ nombre: '', distrito: '', telefono: '', codigo: '' });
    } catch (error) {
      console.error('Error al actualizar el local:', error.response?.data?.message || error.message);
      alert('Error al actualizar el local');
    }
  };

  const handleDelete = async () => {
    try {
      localSchema.pick({ codigo: true }).parse(formData); 
      await deleteLocalRequest(formData.codigo);
      setFormData({ nombre: '', distrito: '', telefono: '', codigo: '' });
    } catch (error) {
      console.error('Error al eliminar el local:', error.response?.data?.message || error.message);
      alert('Error al eliminar el local');
    }
  };

  const [locales, setLocales] = useState([]);
  const handleTodo = async () => {
    try {
      const response = await getLocalesRequest();
      const LocalesData = response.data.map((local, index) => ({
        id: local.codigo, 
        col1: local.nombre,  
        col2: local.distrito, 
        col3: local.telefono,  
      }));
  
      // Actualizamos el array con los datos
      setLocales(LocalesData);
      setFormData({ nombre: '', distrito: '', telefono: '', codigo: '' });
    } catch (error) {
      console.error('Error al cargar los locales:', error.response?.data?.message || error.message);
      alert('Error al cargar los locales');
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
  atr2="Distrito"
  name2="distrito"
  value2={formData.distrito}
  onChange2={handleChange}
  atr3="Telefono"
  name3="telefono"
  value3={formData.telefono}
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
      col2="Distrito" 
      col3="Telefono" 
      rows={locales} 
    />
    </>
  );
}
