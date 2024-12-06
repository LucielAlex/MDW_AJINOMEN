import React, { useState, useEffect } from 'react';
import { createVentaRequest, updateVentaRequest, deleteVentaRequest, getVentasRequest } from '../../api/venta.js';
import Tabla from '../../components/ui/Tabla';
import Botones from '../../components/ui/Botones';
import InputText from '../../components/ui/InputText';
import { ventaSchema } from "../../schemas/venta.js";


export default function VentasPage() {
  const [formData, setFormData] = useState({
    producto: '',
    monto: '',
    metodopago: '',
    codigo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      ventaSchema.parse(formData);
      await createVentaRequest(formData);
      setFormData({
        producto: '',
        monto: '',
        metodopago: '',
        codigo: ''
      });
    } catch (error) {
      alert('Error al procesar la venta: ' + error.response?.data?.message || error.message);
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
      ventaSchema.partial().parse(filteredData); 
      await updateVentaRequest(formData.codigo,filteredData);
      setFormData({ producto: '', monto: '', metodopago: '', codigo: '' });
    } catch (error) {
      console.error('Error al actualizar la venta:', error.response?.data?.message || error.message);
      alert('Error al actualizar la venta');
    }
  };

  const handleDelete = async () => {
    try {
      ventaSchema.pick({ codigo: true }).parse(formData);
      await deleteVentaRequest(formData.codigo);
      setFormData({ producto: '', monto: '', metodopago: '', codigo: '' });
    } catch (error) {
      console.error('Error al eliminar la venta:', error.response?.data?.message || error.message);
      alert('Error al eliminar la venta');
    }
  };

  const [ventas, setVentas] = useState([]);
  const handleTodo = async () => {
    try {
      const response = await getVentasRequest();
      const VentasData = response.data.map((venta, index) => ({
        id: venta.codigo, 
        col1: venta.producto,  
        col2: venta.monto, 
        col3: venta.metodopago,  
      }));
  
      // Actualizamos el array con los datos
      setVentas(VentasData);
      setFormData({ producto: '', monto: '', metodopago: '', codigo: '' });
    } catch (error) {
      console.error('Error al cargar las ventas:', error.response?.data?.message || error.message);
      alert('Error al cargar las ventas');
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
  atr1="producto"
  name1="producto"
  value1={formData.producto}
  onChange1={handleChange}
  atr2="monto"
  name2="monto"
  value2={formData.monto}
  onChange2={handleChange}
  atr3="Metodo de pago"
  name3="metodopago"
  value3={formData.metodopago}
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
      col1="Producto" 
      col2="Monto" 
      col3="Metodo de Pago" 
      rows={ventas} 
    />
    </>
  );
}
