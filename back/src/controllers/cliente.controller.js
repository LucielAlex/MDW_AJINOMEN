import Cliente from "../models/cliente.model.js";

// Crear un cliente
export const createCliente = async (req, res) => {
    try {
      const { nombre, apellido, direccion, codigo } = req.body;
  
      // Validaciones básicas
      if (!nombre || !apellido || !direccion || !codigo) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }
  
      const codigoFound = await Cliente.findOne({ codigo });
  
      if (codigoFound) {
        return res.status(400).json({ message: "El código ya existe" });
      }
  
      const newCliente= new Cliente({ nombre, apellido, direccion, codigo });
      const savedCliente = await newCliente.save();
  
      res.status(201).json(savedCliente);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Obtener todos los clientes
export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un cliente por ID
export const getClienteByCodigo = async (req, res) => {
    try {
      const { codigo } = req.params;
      const cliente = await Cliente.findOne({ codigo });
  
      if (!cliente) {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }
  
      res.status(200).json(cliente);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Actualizar un cliente
export const updateClienteByCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const { nombre, apellido, direccion } = req.body;

    // Construcción dinámica de los campos a actualizar
    const updateFields = {};
    if (nombre !== undefined) updateFields.nombre = nombre;
    if (apellido !== undefined) updateFields.apellido = apellido;
    if (direccion !== undefined) updateFields.direccion = direccion;

    // Validar si hay al menos un campo a actualizar
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No hay campos para actualizar" });
    }

    const updatedCliente = await Cliente.findOneAndUpdate(
      { codigo },
      updateFields,
      { new: true }
    );

    if (!updatedCliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.status(200).json(updatedCliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  

// Eliminar un cliente
export const deleteClienteByCodigo = async (req, res) => {
    try {
      const { codigo } = req.params;
      const deletedCliente = await Cliente.findOneAndDelete({ codigo });
  
      if (!deletedCliente) {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }
  
      res.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
