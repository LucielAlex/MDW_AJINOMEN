import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getLocalesRequest } from "../../api/local.js";

const COLORS = ["#FF3333", "#FF6666", "#FF9999", "#FFD700", "#FFFFFF"];

const DistrictDistributionChart = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchLocales = async () => {
      try {
        const response = await getLocalesRequest();
        const locales = response.data;

        // Agrupamos los locales por distrito
        const districtCounts = locales.reduce((acc, local) => {
          acc[local.distrito] = (acc[local.distrito] || 0) + 1;
          return acc;
        }, {});

        // Transformamos el objeto en un array compatible con el gráfico
        const formattedData = Object.entries(districtCounts).map(([name, value]) => ({
          name,
          value,
        }));

        setCategoryData(formattedData);
      } catch (error) {
        console.error("Error al obtener los locales:", error.response?.data?.message || error.message);
      }
    };

    fetchLocales();
  }, []);

  return (
    <motion.div
      className="bg-black bg-opacity-85 backdrop-blur-md shadow-lg rounded-xl p-6 border border-red-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-yellow-300">Distribución por Distrito</h2>
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

export default DistrictDistributionChart;
