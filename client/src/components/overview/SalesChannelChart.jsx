import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { getVentasRequest } from "../../api/venta.js";

const COLORS = ["#FF3333", "#FF6666", "#FF9999", "#FFD700", "#FFFFFF"];

const SalesChannelChart = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await getVentasRequest();
        const ventas = response.data;

        // Agrupamos las ventas por método de pago y sumamos los montos
        const paymentMethodSums = ventas.reduce((acc, venta) => {
          acc[venta.metodopago] = (acc[venta.metodopago] || 0) + venta.monto;
          return acc;
        }, {});

        // Transformamos el objeto en un array compatible con el gráfico
        const formattedData = Object.entries(paymentMethodSums).map(([name, value]) => ({
          name,
          value,
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
      className="bg-black bg-opacity-85 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Ventas por Método de Pago</h2>

      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#FFD700" />
            <XAxis dataKey="name" stroke="#FFFFFF" />
            <YAxis stroke="#FFFFFF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Bar dataKey={"value"} fill="#E5E7EB">
              {salesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesChannelChart;
