import Venta from "../models/venta.model.js";

// Crear un venta
export const createVenta = async (req, res) => {
    try {
      const { producto, monto, metodopago, codigo } = req.body;
  
      // Validaciones básicas
      if (!producto || !metodopago || !monto === undefined || !codigo) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }

      if (monto <= 0) {
        return res.status(400).json({ message: "El monto debe ser mayor a 0" });
      }
  
      const codigoFound = await Venta.findOne({ codigo });
  
      if (codigoFound) {
        return res.status(400).json({ message: "El código ya existe" });
      }
  
      const newVenta= new Venta({ producto, monto, metodopago, codigo });
      const savedVenta = await newVenta.save();
  
      res.status(201).json(savedVenta);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Obtener todos las ventas
export const getVenta = async (req, res) => {
  try {
    const ventas = await Venta.find();
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una venta por ID
export const getVentaByCodigo = async (req, res) => {
    try {
      const { codigo } = req.params;
      const venta = await Venta.findOne({ codigo });
  
      if (!venta) {
        return res.status(404).json({ message: "Venta no encontrada" });
      }
  
      res.status(200).json(venta);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Actualizar una venta
export const updateVentaByCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const { producto, monto, metodopago } = req.body;

    // Construcción dinámica de los campos a actualizar
    const updateFields = {};
    if (producto !== undefined) updateFields.producto = producto;
    if (monto !== undefined) {
      if (monto <= 0) {
        return res.status(400).json({ message: "El monto debe ser mayor a 0" });
      }
      updateFields.monto = monto;
    }
    if (metodopago !== undefined) updateFields.metodopago = metodopago;

    // Validar si hay al menos un campo a actualizar
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No hay campos para actualizar" });
    }

    const updatedVenta = await Venta.findOneAndUpdate(
      { codigo },
      updateFields,
      { new: true }
    );

    if (!updatedVenta) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    res.status(200).json(updatedVenta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Eliminar una venta
export const deleteVentaByCodigo = async (req, res) => {
    try {
      const { codigo } = req.params;
      const deletedVenta = await Venta.findOneAndDelete({ codigo });
  
      if (!deletedVenta) {
        return res.status(404).json({ message: "venta no encontrada" });
      }
  
      res.status(200).json({ message: "Venta eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
