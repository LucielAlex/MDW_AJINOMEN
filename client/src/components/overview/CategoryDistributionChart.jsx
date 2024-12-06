import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getProductosRequest } from "../../api/producto.js";

const COLORS = ["#FF3333", "#FF6666", "#FF9999", "#FFD700", "#FFFFFF"];

const CategoryDistributionChart = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await getProductosRequest();
        const productos = response.data;

        // Transformamos los datos para que sean compatibles con el gráfico
        const formattedData = productos.map((producto) => ({
          name: producto.nombre,
          value: producto.stock,
        }));

        setCategoryData(formattedData);
      } catch (error) {
        console.error("Error al obtener los productos:", error.response?.data?.message || error.message);
      }
    };

    fetchProductos();
  }, []);

  return (
    <motion.div
      className="bg-black bg-opacity-85 backdrop-blur-md shadow-lg rounded-xl p-6 border border-red-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-yellow-300">Distribución por Sopa</h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={categoryData}
              cx={"50%"}
              cy={"50%"}
              labelLine={false}
              outerRadius={80}
              fill="#FFFFFF"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 51, 51, 0.8)",
                borderColor: "#FF3333",
              }}
              itemStyle={{ color: "#FFFFFF" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;