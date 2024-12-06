
import axios from './axios';

export const getClientesRequest = async () => axios.get("/clientes");

export const createClienteRequest = async (cliente) => axios.post("/clientes", cliente);

export const updateClienteRequest = async (codigo, cliente) => 
  axios.put(`/clientes/${codigo}`, cliente);

export const deleteClienteRequest = async (codigo) => axios.delete(`/clientes/${codigo}`);

export const getClienteRequest = async (codigo) => axios.get(`/clientes/${codigo}`);
