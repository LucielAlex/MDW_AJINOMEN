import Local from "../models/local.model.js";

// Crear un local
export const createLocal = async (req, res) => {
    try {
      const { nombre, distrito, telefono, codigo } = req.body;
  
      // Validaciones básicas
      if (!nombre || !distrito || !telefono || !codigo) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }

      if (telefono <= 0) {
        return res.status(400).json({ message: "El telefono debe tener números mayores a 0" });
      }
  
      const codigoFound = await Local.findOne({ codigo });
  
      if (codigoFound) {
        return res.status(400).json({ message: "El código ya existe" });
      }
  
      const newLocal= new Local({ nombre, distrito, telefono, codigo });
      const savedLocal = await newLocal.save();
  
      res.status(201).json(savedLocal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Obtener todos los locales
export const getLocal = async (req, res) => {
  try {
    const locales = await Local.find();
    res.status(200).json(locales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un local por ID
export const getLocalByCodigo = async (req, res) => {
    try {
      const { codigo } = req.params;
      const local = await Local.findOne({ codigo });
  
      if (!local) {
        return res.status(404).json({ message: "Local no encontrado" });
      }
  
      res.status(200).json(local);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Actualizar un local
export const updateLocalByCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const { nombre, distrito, telefono } = req.body;

    // Construcción dinámica de los campos a actualizar
    const updateFields = {};
    if (nombre !== undefined) updateFields.nombre = nombre;
    if (distrito !== undefined) updateFields.distrito = distrito;
    if (telefono !== undefined) updateFields.telefono = telefono;

    // Validar si hay al menos un campo a actualizar
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No hay campos para actualizar" });
    }

    const updatedLocal = await Local.findOneAndUpdate(
      { codigo },
      updateFields,
      { new: true }
    );

    if (!updatedLocal) {
      return res.status(404).json({ message: "Local no encontrado" });
    }

    res.status(200).json(updatedLocal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  

// Eliminar un local
export const deleteLocalByCodigo = async (req, res) => {
    try {
      const { codigo } = req.params;
      const deletedLocal = await Local.findOneAndDelete({ codigo });
  
      if (!deletedLocal) {
        return res.status(404).json({ message: "Local no encontrado" });
      }
  
      res.status(200).json({ message: "Local eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
