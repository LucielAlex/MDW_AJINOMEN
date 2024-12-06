
import axios from './axios';

export const getLocalesRequest = async () => axios.get("/locales");

export const createLocalRequest = async (local) => axios.post("/locales", local);

export const updateLocalRequest = async (codigo, local) => 
  axios.put(`/locales/${codigo}`, local);

export const deleteLocalRequest = async (codigo) => axios.delete(`/locales/${codigo}`);

export const getLocalRequest = async (codigo) => axios.get(`/locales/${codigo}`);
