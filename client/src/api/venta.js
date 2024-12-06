
import axios from './axios';

export const getVentasRequest = async () => axios.get("/ventas");

export const createVentaRequest = async (venta) => axios.post("/ventas", venta);

export const updateVentaRequest = async (codigo, venta) => 
  axios.put(`/ventas/${codigo}`, venta);

export const deleteVentaRequest = async (codigo) => axios.delete(`/ventas/${codigo}`);

export const getVentaRequest = async (codigo) => axios.get(`/ventas/${codigo}`);
