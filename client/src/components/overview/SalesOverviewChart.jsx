import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getVentasRequest } from "../../api/venta.js";

const SalesOverviewChart = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await getVentasRequest();
        const ventas = response.data;

        // Transformamos los datos para el gráfico
        const formattedData = ventas.map((venta) => ({
          name: venta.producto, // Producto en el eje X
          sales: venta.monto, // Monto en el eje Y
        }));

        setSalesData(formattedData);
      } catch (error) {
        console.error("Error al obtener las ventas:", error.response?.data?.message || error.message);
      }
    };

    fetchVentas();
  }, []);

  return (
    <motion.div
      className="bg-black bg-opacity-85 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Resumen de Ventas</h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#FF6666" />
            <XAxis 
              dataKey={"name"} 
              stroke="#FFD700" 
              angle={-45} 
              textAnchor="end"
              height={97} // Incrementamos la altura del eje X para las etiquetas
            />
            <YAxis stroke="#FFD700" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 51, 51, 0.8)",
                borderColor: "#FF3333",
              }}
              itemStyle={{ color: "#FFFFFF" }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#FFFFFF"
              strokeWidth={3}
              dot={{ fill: "#FFD700", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesOverviewChart;