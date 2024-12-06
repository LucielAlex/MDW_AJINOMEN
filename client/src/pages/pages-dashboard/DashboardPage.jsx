import React, { useEffect, useState } from 'react';
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import SalesOverviewChart from "../../components/overview/SalesOverviewChart";
import PricesOverviewChart from "../../components/overview/PricesOverviewChart";
import CategoryDistributionChart from "../../components/overview/CategoryDistributionChart";
import DistrictDistributionChart from "../../components/overview/DistrictDistributionChart";
import SalesChannelChart from "../../components/overview/SalesChannelChart";
import { getClientesRequest } from '../../api/cliente.js';
import { getVentasRequest } from '../../api/venta.js';
import { getProductosRequest } from '../../api/producto.js';

const DashboardPage = () => {
  const [clientesCount, setClientesCount] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);
  const [totalStock, setTotalStock] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener clientes
        const clientesResponse = await getClientesRequest();
        setClientesCount(clientesResponse.data.length);

        // Obtener ventas
        const ventasResponse = await getVentasRequest();
        const ventasTotal = ventasResponse.data.reduce((acc, venta) => acc + venta.monto, 0).toFixed(2);
        setTotalVentas(ventasTotal);

        // Obtener productos
        const productosResponse = await getProductosRequest();
        const stockTotal = productosResponse.data.reduce((acc, producto) => acc + producto.stock, 0);
        setTotalStock(stockTotal);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Resumen' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* STATS */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name='Sopas Vendidas Totales' icon={Zap} value={`S/.${totalVentas}`} color='#FF3333' />
          <StatCard name='Clientes Totales' icon={Users} value={clientesCount} color='#FFD700' />
          <StatCard name='Sopas Totales' icon={ShoppingBag} value={totalStock} color='#FF6666' />
          <StatCard name='Tasa de Conversión' icon={BarChart2} value='10%' color='#FFFFFF' />
        </motion.div>

        {/* CHARTS */}

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <SalesOverviewChart />
          <CategoryDistributionChart />
          <SalesChannelChart />
          <DistrictDistributionChart />
          <PricesOverviewChart />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
