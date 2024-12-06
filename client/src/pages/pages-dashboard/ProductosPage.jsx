import React, { useState, useEffect } from 'react';
import { createProductoRequest, updateProductoRequest, deleteProductoRequest, getProductosRequest } from '../../api/producto.js';
import Tabla from '../../components/ui/Tabla';
import Botones from '../../components/ui/Botones';
import InputText from '../../components/ui/InputText';
import { productoSchema } from "../../schemas/producto.js";


export default function ProductosPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
    codigo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      productoSchema.parse(formData);
      await createProductoRequest(formData);
      setFormData({
        nombre: '',
        precio: '',
        stock: '',
        codigo: ''
      });
    } catch (error) {
      alert('Error al guardar el producto: ' + error.response?.data?.message || error.message);
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
      productoSchema.partial().parse(filteredData); 
  
      await updateProductoRequest(formData.codigo, filteredData);
      setFormData({ nombre: '', precio: '', stock: '', codigo: '' });
    } catch (error) {
      console.error('Error al actualizar el producto:', error.response?.data?.message || error.message);
      alert('Error al actualizar el producto');
    }
  };
  
  const handleDelete = async () => {
    try {
      productoSchema.pick({ codigo: true }).parse(formData);
      await deleteProductoRequest(formData.codigo);
      setFormData({ nombre: '', precio: '', stock: '', codigo: '' });
    } catch (error) {
      console.error('Error al eliminar el producto:', error.response?.data?.message || error.message);
      alert('Error al eliminar el producto');
    }
  };

  const [productos, setProductos] = useState([]);
  const handleTodo = async () => {
    try {
      const response = await getProductosRequest();
      const ProductosData = response.data.map((producto, index) => ({
        id: producto.codigo, 
        col1: producto.nombre,  
        col2: producto.precio, 
        col3: producto.stock,  
      }));
  
      // Actualizamos el array con los datos
      setProductos(ProductosData);
      setFormData({ nombre: '', precio: '', stock: '', codigo: '' });
    } catch (error) {
      console.error('Error al cargar los productos:', error.response?.data?.message || error.message);
      alert('Error al cargar los productos');
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
  atr2="Precio"
  name2="precio"
  value2={formData.precio}
  onChange2={handleChange}
  atr3="Stock"
  name3="stock"
  value3={formData.stock}
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
      col2="Precio" 
      col3="Stock" 
      rows={productos} 
    />
    </>
  );
}
