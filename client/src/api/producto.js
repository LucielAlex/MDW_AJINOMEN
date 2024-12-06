
import axios from './axios';

export const getProductosRequest = async () => axios.get("/productos");

export const createProductoRequest = async (producto) => axios.post("/productos", producto);

export const updateProductoRequest = async (codigo, producto) => 
  axios.put(`/productos/${codigo}`, producto);

export const deleteProductoRequest = async (codigo) => axios.delete(`/productos/${codigo}`);

export const getProductoRequest = async (codigo) => axios.get(`/productos/${codigo}`);
