import Producto from "../models/producto.model.js";

// Crear un producto
export const createProduct = async (req, res) => {
    try {
      const { nombre, precio, stock, codigo } = req.body;
  
      // Validaciones básicas
      if (!nombre || precio === undefined || stock === undefined || !codigo) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }
  
      if (precio <= 0 || stock <= 0) {
        return res.status(400).json({ message: "El precio y el stock deben ser mayores a 0" });
      }
  
      const codigoFound = await Producto.findOne({ codigo });
  
      if (codigoFound) {
        return res.status(400).json({ message: "El código ya existe" });
      }
  
      const newProduct = new Producto({ nombre, precio, stock, codigo });
      const savedProduct = await newProduct.save();
  
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Producto.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por ID
export const getProductByCodigo = async (req, res) => {
    try {
      const { codigo } = req.params;
      const product = await Producto.findOne({ codigo });
  
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
  
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Actualizar un producto
export const updateProductByCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const { nombre, precio, stock } = req.body;

    // Construye el objeto de actualización dinámicamente
    const updateFields = {};
    if (nombre !== undefined) updateFields.nombre = nombre;
    if (precio !== undefined) {
      if (precio <= 0) {
        return res.status(400).json({ message: "El precio debe ser mayor a 0" });
      }
      updateFields.precio = precio;
    }
    if (stock !== undefined) {
      if (stock <= 0) {
        return res.status(400).json({ message: "El stock debe ser mayor a 0" });
      }
      updateFields.stock = stock;
    }

    // Evita que se intente actualizar sin campos válidos
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No hay campos para actualizar" });
    }

    const updatedProduct = await Producto.findOneAndUpdate(
      { codigo },
      updateFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  

// Eliminar un producto
export const deleteProductByCodigo = async (req, res) => {
    try {
      const { codigo } = req.params;
      const deletedProduct = await Producto.findOneAndDelete({ codigo });
  
      if (!deletedProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
  
      res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
